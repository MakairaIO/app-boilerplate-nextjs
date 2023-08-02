import { NextApiRequest, NextApiResponse } from 'next'
import * as crypto from 'crypto'

import { prismaClient } from 'src/utils/dbClient'
import { MakairaAuthData } from '@/types/App'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    nonce,
    domain,
    instance,
    hmac,
    slug,
  } = req.query

  try {
    const appInfo = await prismaClient.appInfo.findFirst({
      where: {
        makaira_domain: domain as string,
        makaira_instance: instance as string,
        app_slug: slug as string,
      },
      select: {
        app_secret: true,
      },
    })
    const secret = appInfo?.app_secret
    if (secret) {
      const expectedHMAC = crypto
        .createHmac('sha256', secret ?? '')
        .update(`${nonce}:${domain}:${instance}`)
        .digest('hex')

      if (expectedHMAC === hmac) {
        const tokenNonce = crypto.randomBytes(20).toString('hex')
        const tokenHMAC = crypto
          .createHmac('sha256', secret ?? '')
          .update(`${tokenNonce}:${domain}:${instance}:${hmac}`)
          .digest('hex')

          const secretProps: MakairaAuthData = {
            hmac: tokenHMAC,
            makairaHmac: hmac ?? null,
            nonce: tokenNonce,
            instance: instance as string,
            domain: domain as string,
            slug: slug as string,
          }

          res.status(200).json(secretProps)
      }
    }
  } catch (error) {
    console.debug(error)
  }
  
  return res.status(401).json({ message: 'Wrong credentials!' });
}

export default handler