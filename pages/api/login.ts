import auth0 from '../../src/utils/auth/auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleLogin(req, res)
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
