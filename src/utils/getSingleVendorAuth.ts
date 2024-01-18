import * as crypto from 'crypto'
import { APP_TYPE, MakairaAppQuery, MakairaAuthData } from "@/types/App";
import { getAppTypeFromPath } from './getAppTypeFromPath';


export function getSingleVendorAuth(url: string, params: MakairaAppQuery) {
  const {
    nonce,
    domain,
    instance,
    hmac,
    appType = getAppTypeFromPath(url),
    slug,
  } = params

  let secret = null
  let appSlug = null
  switch (appType) {
    case APP_TYPE.CONTENT_WIDGET:
      secret = process.env.MAKAIRA_APP_SECRET_CONTENT_WIDGET
      appSlug = process.env.MAKAIRA_APP_SLUG_CONTENT_WIDGET
      break;
    case APP_TYPE.CONTENT_MODAL:
      secret = process.env.MAKAIRA_APP_SECRET_CONTENT_MODAL
      appSlug = process.env.MAKAIRA_APP_SLUG_CONTENT_MODAL
      break;
    default:
      secret = process.env.MAKAIRA_APP_SECRET
      appSlug = process.env.MAKAIRA_APP_SLUG
      break;
  }

  if (!secret || !appSlug) {
    throw Error('[Example App] Environment for Single App were not set')
  }

  // At first, we need to check if the page was requested from the Makaira Admin UI.
  // The UI sends an HMAC and a Nonce which we can use together with our app secret
  // that the request comes from the Makaira Admin UI (because only there the HMAC
  // can be generated).
  const expectedHMAC = crypto
    .createHmac('sha256', secret ?? '')
    .update(`${nonce}:${domain}:${instance}`)
    .digest('hex')

  // If the provided HMAC isn't equal to the expected one (which will also be the
  // case when the query parameters were not provided at all), we will redirect to
  // the bad auth/error page.
  if ((expectedHMAC !== hmac || slug !== appSlug) && process.env.NODE_ENV !== 'development') {
    return null
  }

  // To request the JWT/Bearer-Token from the Admin UI we need another HMAC
  // to proof to the Admin UI that we are allowed to receive the tokens.
  // The new HMAC will be signed by our app secret and contain the HMAC
  // from the query parameters so that we can not simply return the received one.
  const tokenNonce = crypto.randomBytes(20).toString('hex')
  const tokenHMAC = crypto
    .createHmac('sha256', secret ?? '')
    .update(`${tokenNonce}:${domain}:${instance}:${hmac}`)
    .digest('hex')

  const secretProps: MakairaAuthData = {
    hmac: tokenHMAC,
    makairaHmac: hmac ?? null,
    nonce: tokenNonce,
    instance: instance ?? process.env.DEV_INSTANCE ?? '',
    domain: domain ?? process.env.DEV_DOMAIN ?? '',
    slug: slug ?? '',
  }

  return secretProps
}