import auth0 from '../../src/utils/auth/auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleCallback(req, res)
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
