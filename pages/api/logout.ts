import auth0 from '../../src/utils/auth/auth0'
import { NextApiHandler } from 'next'

const logout: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleLogout(req, res, { returnTo: '/' })
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}

export default logout;
