import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';

import { useFetchUser } from '../src/core/hooks/useFetchUser';
import { withApollo } from '../src/utils/networking/withApollo';
import Login from '../src/modules/Login';

const Home: NextPage = () => {
  const { user, loading } = useFetchUser()
  if (!loading && !user) {
    return (<Login />);
  }
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
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default withApollo({ ssr: true })(Home);
