import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import type { NextPage } from 'next';
import * as React from 'react';

import { useFetchUser } from '../../src/core/hooks/useFetchUser';
import Login from '../../src/modules/Login';
import Logout from '../../src/modules/Logout';
import UserBoard from '../../src/modules/UserBoard';
import { withApollo } from '../../src/utils/networking/withApollo';

const Simulations: NextPage = () => {
  const { user, loading } = useFetchUser();
  const userid = user && user.sub;

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
          {user !== null && (
            <Typography variant="h6" style={{ flex: 1 }}>
              {user.name}
            </Typography>
          )}
          <Logout />
        </Toolbar>
      </AppBar>
      <UserBoard userid={userid} />
    </Box>
  );
};

export default withApollo({ ssr: true })(Simulations);
