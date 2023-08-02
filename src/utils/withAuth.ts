import { NextApiRequest, NextApiResponse } from 'next'
import * as crypto from 'crypto'
import { prismaClient } from 'src/utils/dbClient'

type AuthNextHandler = (request: NextApiRequest, response: NextApiResponse) => void

export const withAuth = (next: AuthNextHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { nonce, domain, instance, hmac, slug } = req.query

    if (nonce && domain && slug && hmac) {
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
            return next(req, res)
          }
        }
      } catch (error) {
        console.debug(error)
      }
    }
    return res.status(401).json({ message: 'Wrong credentials!' })
  }
}
