import { Box, Container, Grid, Paper, Toolbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';

import { SequencesContextProvider } from '../contexts';
import Controls from '../Controls';
import FinalResults from '../FinalResults';
import ItemizedReport from '../ItemizedReport';
import Sequences from '../Sequences';
import Simulations from '../Simulations';
import SiteMap from '../SiteMap';
import ViewModel from '../ViewModel';

const Dashboard = (): JSX.Element => {
  const viewModel = useMemo(() => new ViewModel(), []);
  return (
    <SequencesContextProvider value={viewModel}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <SiteMap />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Sequences />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  alignItems: 'center',
                }}
              >
                <Controls />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <ItemizedReport />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <FinalResults />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Simulations />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </SequencesContextProvider>
  );
};

export default observer(Dashboard);
