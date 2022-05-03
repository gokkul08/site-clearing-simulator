import React, { useMemo } from 'react';
import { Box, Container, Paper, Grid, Toolbar } from '@mui/material';
import Controls from '../Controls';
import Sequences from '../Sequences';
import SiteMap from '../SiteMap';
import ItemizedReport from '../ItemizedReport';
import FinalResults from '../FinalResults';
import Simulations from '../Simulations';
import { SequencesContextProvider } from '../contexts';
import ViewModel from '../ViewModel';
import { Provider } from 'mobx-react';
import { observer } from 'mobx-react-lite';

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