import * as crypto from 'crypto'

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { CONTENT_WIDGET_PATHS } from '@/utils/contentWidgetPaths'

type MakairaAuthData = {
  // New generated HMAC which is used to receive the JWT-token from the Makaira Admin UI
  hmac: string
  // New generated nonce which is used to receive the JWT-token from the Makaira Admin UI
  nonce: string
  // Domain where the app was opened from
  domain: string
  // Instance where the app was opened from
  instance: string
  // HMAC that was received from the Makaira Admin UI
  makairaHmac: string | null
}

type ExpectedQueryParams = {
  nonce: undefined | string
  hmac: undefined | string
  instance: undefined | string
  domain: undefined | string
}

type IncomingPageServerSideProp<P> = (
  ctx: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>>

export function withMakaira<T>(
  incomingGSSP?: IncomingPageServerSideProp<T> | null
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T & MakairaAuthData>> => {
    const { nonce, domain, instance, hmac } = ctx.query as ExpectedQueryParams

    const url = new URL(ctx.req.url ?? '', `https://${ctx.req.headers.host}`)

    const secret = CONTENT_WIDGET_PATHS.includes(url.pathname)
      ? process.env.MAKAIRA_APP_SECRET_CONTENT_WIDGET
      : process.env.MAKAIRA_APP_SECRET

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
    if (expectedHMAC !== hmac && process.env.NODE_ENV !== 'development') {
      return {
        redirect: {
          destination: 'bad-auth',
          permanent: false,
        },
      }
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
    }

    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(ctx)

      if ('props' in incomingGSSPResult) {
        const result = {
          props: {
            ...secretProps,
            ...incomingGSSPResult.props,
          },
        }

        // @ts-ignore
        return result
      }

      if ('redirect' in incomingGSSPResult) {
        return { redirect: { ...incomingGSSPResult.redirect } }
      }

      if ('notFound' in incomingGSSPResult) {
        return { notFound: incomingGSSPResult.notFound }
      }
    }

    return {
      // @ts-ignore
      props: secretProps,
    }
  }
}
