import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';

import { useFetchUser } from '../src/core/hooks/useFetchUser';
import { withApollo } from '../src/utils/networking/withApollo';
import Login from '../src/modules/Login';
import Logout from '../src/modules/Logout';
import Dashboard from '../src/modules/Dashboard';

const Home: NextPage = () => {
  const { user, loading } = useFetchUser()
  if (!loading && !user) {
    return (
      <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Site Clearing Simulator
        </Typography>
        <Login />
      </Box>
    </Container>
    );
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" style={{ flex: 1 }}>
            Site Clearing Simulator
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
      <Dashboard />
    </Box>
  );
};

export default withApollo({ ssr: true })(Home);
