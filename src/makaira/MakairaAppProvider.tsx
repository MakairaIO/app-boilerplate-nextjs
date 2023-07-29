import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react'
import { decode, JwtPayload } from 'jsonwebtoken'

import MakairaClient from '@/makaira/MakairaClient'
import { APP_TYPE } from '@/types/App'

type MakairaAppProviderProps = React.PropsWithChildren<{
  hmac: string
  nonce: string
  makairaHmac: string
  domain: string
  instance: string
  appType: APP_TYPE
  slug: string
}>

type MakairaAppMessage = {
  action: string,
  data: any
}

export type MakairaJWTPayload = JwtPayload & {
  nickname: string
  name: string
  picture: string
  email: string
}

export type MakairaAppContextData = {
  token: undefined | string
  domain: undefined | string
  instance: undefined | string
  client: MakairaClient
  messages: undefined | MakairaAppMessage[]
  payload: MakairaJWTPayload | null
}

type ResponseUserRequestPayload = {
  token: string
}

const MakairaAppContext = createContext<MakairaAppContextData>({
  token: undefined,
  domain: undefined,
  instance: undefined,
  client: new MakairaClient(),
  messages: [],
  payload: null,
})

const MakairaAppProvider: React.FC<MakairaAppProviderProps> = ({
  children,
  hmac,
  nonce,
  makairaHmac,
  domain,
  instance,
  appType = 'app',
  slug
}) => {
  const [token, setToken] = useState<string>()
  const client = useRef<MakairaClient>(new MakairaClient())
  const [messages, setMessages] = useState<MakairaAppMessage[]>([])

  const handleMessage = useCallback((event: MessageEvent) => {
    if (
      event.origin.match('https:\\/\\/([a-zA-Z])+\\.makaira\\.io')?.index !==
        0 &&
      event.origin !== 'https://makaira.vm'
    )
      return

    const { data } = event
    if (data.source !== `makaira-${appType}-bridge`) return

    console.debug('[Example-App] Makaira response message: ', event.data)

    switch (data.action) {
      case 'responseUserRequest':
        handleResponseUserRequest(data.data)
      default:
        setMessages((current) => {
          return [
            ...current,
            {
              ...data
            }
          ]
        })
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

      const targetOrigin = document.referrer?.length ? document.referrer : '*'

      const message = {
        source: `makaira-${appType}-${slug}`,
        action: 'requestUser',
        hmac,
        nonce,
        makairaHmac,
      }

      console.debug('[Example-App] Request Auth-Token from Makaira-Admin-UI', message)

      window.parent.postMessage(message, targetOrigin)
    }
  }, [hmac, makairaHmac, nonce, token, appType, slug])

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
        messages,
        payload: decode(token ?? '') as MakairaJWTPayload,
      }}
    >
      {children}
    </MakairaAppContext.Provider>
  )
}

const useMakairaApp = () => {
  return useContext(MakairaAppContext)
}

export { MakairaAppProvider, MakairaAppContext, useMakairaApp }
