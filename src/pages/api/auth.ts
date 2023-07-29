import { NextApiRequest, NextApiResponse } from 'next'
import { withMakaira } from '@/utils/apiMiddleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isAuth = await withMakaira(req)

  if (!isAuth) {
    return res.status(401).json({ message: 'Wrong credentials!' })
  }
  
  return res.status(200);
}
