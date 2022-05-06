import { NextApiHandler } from 'next';

import auth0 from '../../src/utils/auth/auth0';

const session: NextApiHandler = async (req, res) => {
  try {
    const { accessToken } = await auth0.getAccessToken(req, res, {});
    res.status(200).json({ accessToken });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default session;
