import auth0 from "../../src/utils/auth/auth0";
import { NextApiHandler } from "next";

const callback: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleCallback(req, res, {
      redirectUri: "http://localhost:3000",
    });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callback;
