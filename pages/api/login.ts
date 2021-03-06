import { NextApiHandler } from 'next';

import auth0 from '../../src/utils/auth/auth0';

const login: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleLogin(req, res);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default login;
