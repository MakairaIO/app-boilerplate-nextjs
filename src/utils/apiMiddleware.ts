import { NextApiRequest } from 'next'
import * as crypto from 'crypto'
import { prismaClient } from 'src/utils/dbClient'

export const withMakaira = async (req: NextApiRequest): Promise<boolean> => {
  const { makairaNonce, domain, instance, makairaHmac, appSlug } = req.query
  const { appSecret } = JSON.parse(req.body || '{}')

  let secret = ''

  if (appSecret) {
    secret = appSecret
  } else {
    const appInfo = await prismaClient.appInfo.findFirst({
      where: {
        makaira_domain: domain as string,
        makaira_instance: instance as string,
        app_slug: appSlug as string,
      },
      select: {
        app_secret: true,
      },
    })
    secret = appInfo?.app_secret || ''
  }

  const expectedHMAC = crypto
    .createHmac('sha256', secret ?? '')
    .update(`${makairaNonce}:${domain}:${instance}`)
    .digest('hex')

  if (expectedHMAC !== makairaHmac) {
    return false
  }

  return true
}
