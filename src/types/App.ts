export enum APP_TYPE {
  APP = 'app',
  CONTENT_WIDGET = 'content-widget',
  CONTENT_MODAL = 'content-modal',
}

export type MakairaAuthData = {
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

  // read from ENVIRONMENT
  slug: string
}

export type MakairaAppQuery = {
  nonce?: string
  hmac?: string
  instance?: string
  domain?: string
  slug?: string
  appType?: string
}