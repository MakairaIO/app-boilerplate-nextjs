import { withAuth } from '@/utils/withAuth'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(201).json({
    success: true,
    message: 'This is an example message from an API route.',
  })
}

// all request need to be wrap with withAuth func as HOC 
// to check valid app before process data
export default  withAuth(handler)