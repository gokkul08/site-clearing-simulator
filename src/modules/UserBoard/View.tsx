import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Toolbar,
  InputLabel,
  MenuItem,
  FormControl,
  LinearProgress,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import ViewModel from "../ViewModel";
import { gql, useQuery } from "@apollo/client";
// import { UserSimulationsContextProvider } from "../contexts";
import { SequencesContextProvider } from "../contexts";
import Sequences from "../Sequences";
import SiteMap from "../SiteMap";
import ItemizedReport from "../ItemizedReport";
import FinalResults from "../FinalResults";

interface Props {
  userid: string;
}

interface Simulation {
  file: string;
  id: number;
  plain: number;
  preservedtree: number;
  revisited: number;
  rocky: number;
  sequence: string;
  tree: number;
  __typename: string;
}

const GET_MY_SIMULATIONS = gql`
  query getMySimulations($userid: String!) {
    simulations(where: { user: { id: { _eq: $userid } } }) {
      id
      sequence
      file
      plain
      rocky
      tree
      preservedtree
      revisited
    }
  }
`;

const UserBoard = ({ userid }: Props): JSX.Element => {
  const viewModel = useMemo(() => new ViewModel(), []);
  const [simulation, setSimulation] = useState<Simulation>();
  const [show, setShow] = useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSimulation(event.target.value as unknown as Simulation);
    setShow(true);
  };
  const { loading, data } = useQuery(GET_MY_SIMULATIONS, {
    variables: { userid },
  });
  const {
    selectText,
    setSequences,
    setFileInput,
    setUpload,
    setSimulatorOutput,
  } = viewModel;
  if (typeof simulation !== "undefined") {
    const { sequence, file, plain, rocky, revisited, tree, preservedtree } =
      simulation;
    setSequences(sequence);
    setFileInput(file);
    setUpload(true);
    setSimulatorOutput(plain, rocky, tree, revisited, preservedtree);
  }
  if (data && !loading) {
    const { simulations } = data;
    return (
      <SequencesContextProvider value={viewModel}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="simulation-select-label">
                      {selectText}
                    </InputLabel>
                    <Select
                      labelId="simulation-select-label"
                      id="simulation-select"
                      value={simulation || ""}
                      label="Simulation"
                      onChange={handleChange}
                    >
                      {simulations.map((simulation) => (
                        <MenuItem value={simulation} key={simulation.id}>
                          {simulation.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {show && <Sequences />}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    alignItems: "center",
                  }}
                >
                  {show && <SiteMap />}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {show && <ItemizedReport />}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {show && <FinalResults />}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SequencesContextProvider>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <LinearProgress />
    </Box>
  );
};

export default observer(UserBoard);
