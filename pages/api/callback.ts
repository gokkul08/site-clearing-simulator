import { NextApiHandler } from 'next';

import auth0 from '../../src/utils/auth/auth0';

const callback: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleCallback(req, res, {
      redirectUri: 'https://site-simulator-app-gokkul.herokuapp.com',
    });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callback;
