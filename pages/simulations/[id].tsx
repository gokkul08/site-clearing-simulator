import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import { useFetchUser } from '../../src/core/hooks/useFetchUser';
import { withApollo } from '../../src/utils/networking/withApollo';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import Login from '../../src/modules/Login';
import Logout from '../../src/modules/Logout';
import UserBoard from '../../src/modules/UserBoard';

const Simulations: NextPage = () => {
  const router = useRouter()
  const { pid } = router.query;
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
          <Logout />
        </Toolbar>
      </AppBar>
      <UserBoard userid={userid}/>
    </Box>
  );
}

export default withApollo({ ssr: true })(Simulations)