import Router from "next/router";
import React, { useState } from "react";
import ViewModel from "../ViewModel";
import { Box, Button, styled, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { observer } from "mobx-react-lite";
import { gql, useMutation } from "@apollo/client";
import { useFetchUser } from "../../core/hooks/useFetchUser";

interface Props {
  viewModel: ViewModel;
}

const FixedButton = styled(Button)({
  minWidth: "120px",
});

const FixedSimulationButton = styled(Button)({
  minWidth: "255px",
});

const ADD_SIMULATION = gql`
  mutation (
    $sequence: String!
    $file: String!
    $userid: String!
    $plain: Int!
    $rocky: Int!
    $tree: Int!
    $preservedTree: Int!
    $revisited: Int!
  ) {
    insert_simulations(
      objects: {
        file: $file
        sequence: $sequence
        userid: $userid
        plain: $plain
        rocky: $rocky
        tree: $tree
        preservedtree: $preservedTree
        revisited: $revisited
      }
    ) {
      affected_rows
      returning {
        file
        sequence
      }
    }
  }
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Controls = ({ viewModel }: Props) => {
  const [addSimulation] = useMutation(ADD_SIMULATION);
  const [open, setOpen] = React.useState(false);
  const { user } = useFetchUser();
  const {
    handleLeftButton,
    handleRightButton,
    handleAdvanceButton,
    handleQuitButton,
    handleSaveSimulation,
    isUploaded,
    sequences,
    buttonText1,
    buttonText2,
    buttonText3,
    buttonText4,
    buttonText6,
    simulatorOutput,
    fileInputText,
    simulationButtonState,
    simulationUploadText,
  } = viewModel;
  const { rocky, plain, tree, preservedTree, revisited } = simulatorOutput;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Box sx={{ "& button": { m: 1 }, mt: 2 }}>
      <div>
        <FixedButton
          variant="contained"
          size="large"
          onClick={handleLeftButton}
          disabled={!isUploaded}
        >
          {buttonText1}
        </FixedButton>
        <FixedButton
          variant="contained"
          size="large"
          onClick={handleRightButton}
          disabled={!isUploaded}
        >
          {buttonText2}
        </FixedButton>
      </div>
      <div>
        <FixedButton
          variant="contained"
          size="large"
          onClick={handleAdvanceButton}
          disabled={!isUploaded}
        >
          {buttonText3}
        </FixedButton>
        <FixedButton
          variant="contained"
          size="large"
          onClick={() => {
            handleQuitButton(true);
          }}
          disabled={!isUploaded}
        >
          {buttonText4}
        </FixedButton>
      </div>
      <div>
        <FixedSimulationButton
          variant="contained"
          size="large"
          onClick={() => {
            addSimulation({
              variables: {
                sequence: sequences.toString(),
                file: fileInputText,
                userid: user && user.sub,
                plain,
                rocky,
                tree,
                preservedTree,
                revisited,
              },
            });
            handleSaveSimulation();
            setOpen(true);
          }}
          disabled={simulationButtonState}
        >
          {buttonText6}
        </FixedSimulationButton>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {simulationUploadText}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
};

export default observer(Controls);
