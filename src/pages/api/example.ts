import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(201).json({
    success: true,
    message: 'This is an example message from an API route.',
  })
}
