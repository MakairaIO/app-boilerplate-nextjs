import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
} from 'react'

import MakairaClient from '@/makaira/MakairaClient'

type MakairaAppProviderProps = React.PropsWithChildren<{
  hmac: string
  nonce: string
  makairaHmac: string
  domain: string
  instance: string
}>

export type MakairaAppContextData = {
  token: undefined | string
  domain: undefined | string
  instance: undefined | string
  client: MakairaClient
}

type ResponseUserRequestPayload = {
  token: string
}

const MakairaAppContext = createContext<MakairaAppContextData>({
  token: undefined,
  domain: undefined,
  instance: undefined,
  client: new MakairaClient(),
})

const MakairaAppProvider: React.FC<MakairaAppProviderProps> = ({
  children,
  hmac,
  nonce,
  makairaHmac,
  domain,
  instance,
}) => {
  const [token, setToken] = useState<string>()
  const client = useRef<MakairaClient>(new MakairaClient())

  const handleMessage = useCallback((event: MessageEvent) => {
    if (
      event.origin.match('https:\\/\\/([a-zA-Z])+\\.makaira\\.io')?.index !== 0
    )
      return

    const { data } = event
    if (data.source !== 'makaira-app-bridge') return

    switch (data.action) {
      case 'responseUserRequest':
        handleResponseUserRequest(data.data)
    }
  }, [])

  useEffect(() => {
    client.current.setInstance(instance)
    client.current.setDomain(domain)
  }, [instance, domain])

  useEffect(() => {
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !makairaHmac) {
      console.debug(
        '[Example-App] Skipping Auth-Request because app runs in dev-mode and query parameters are undefined'
      )
      setToken(process.env.NEXT_PUBLIC_DEV_TOKEN)
      client.current.setToken(process.env.NEXT_PUBLIC_DEV_TOKEN ?? '')
    } else if (!token) {
      console.debug('[Example-App] Request Auth-Token from Makaira-Admin-UI')

      const targetOrigin = document.referrer?.length ? document.referrer : '*'

      const message = {
        source: `makaira-app-${process.env.NEXT_PUBLIC_APP_SLUG}`, // replace with makaira-app-{YOU_APP_SLUG}
        action: 'requestUser',
        hmac,
        nonce,
        makairaHmac,
      }

      window.parent.postMessage(message, targetOrigin)
    }
  }, [hmac, makairaHmac, nonce, token])

  const handleResponseUserRequest = (data: ResponseUserRequestPayload) => {
    console.debug('[Example-App] Received token from Makaira Admin UI.')

    setToken(data.token)
    client.current.setToken(data.token)
  }

  return (
    <MakairaAppContext.Provider
      value={{
        token,
        domain,
        instance,
        client: client.current,
      }}
    >
      {children}
    </MakairaAppContext.Provider>
  )
}

export { MakairaAppProvider, MakairaAppContext }
