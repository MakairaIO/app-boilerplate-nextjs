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
  addMessageListener: (
    action: MessageListener['action'],
    handler: MessageListener['handler']
  ) => void
  sendMessage: (action: string, payload?: Record<string, any>) => void
}

type ResponseUserRequestPayload = {
  token: string
}

type MessageListener = {
  action: string
  handler: (event: MessageEvent) => void
}

const MakairaAppContext = createContext<MakairaAppContextData>({
  token: undefined,
  domain: undefined,
  instance: undefined,
  client: new MakairaClient(),
  messages: [],
  payload: null,
  addMessageListener: () => {},
  sendMessage: () => {},
})

const MakairaAppProvider: React.FC<MakairaAppProviderProps> = ({
  children,
  hmac,
  nonce,
  makairaHmac,
  domain,
  instance,
  appType = 'app',
  slug,
}) => {
  const [token, setToken] = useState<string>('')
  const client = useRef<MakairaClient>(new MakairaClient())
  const [messages, setMessages] = useState<MakairaAppMessage[]>([])
  const messageListeners = useRef<MessageListener[]>([])

  const addMessageListener = (action: string, handler: (event: MessageEvent) => void) => {
    const listeners = messageListeners.current.filter((l) => l.action !== action)
    messageListeners.current = [...listeners, { action, handler }]
  }

  const handleMessage = useCallback((event: MessageEvent) => {
    if (!event.origin.includes('.makaira.io') && event.origin !== 'https://makaira.vm') {
      return
    }

    console.debug('[Example-App] Response message from Makaira-Admin-UI', event)

    const { data } = event

    switch (data.action) {
      case 'responseUserRequest':
        handleResponseUserRequest(data.data)
      default:
        setMessages((current) => {
          return [
            ...current,
            {
              ...data,
            },
          ]
        })
    }

    if (messageListeners.current?.length) {
      messageListeners.current.forEach((listener) => {
        if (listener.action === data.action && listener.handler) {
          listener.handler(event)
        }
      })
    }
  }, [])

  const sendMessage = (action: string, payload = {}) => {
    const targetOrigin = document.referrer?.length ? document.referrer : '*'
    const message = {
      source: `makaira-${appType}-${slug}`,
      action,
      ...payload,
    }
    window.parent.postMessage(message, targetOrigin)
  }

  useEffect(() => {
    client.current.setInstance(instance)
    client.current.setDomain(domain)
    client.current.setToken(token)
  }, [instance, domain, token])

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
      setToken(process.env.NEXT_PUBLIC_DEV_TOKEN || '')
      client.current.setToken(process.env.NEXT_PUBLIC_DEV_TOKEN ?? '')
    } else if (!token && slug && appType && hmac && nonce && makairaHmac) {
      console.debug('[Example-App] Request Auth-Token from Makaira-Admin-UI')
      sendMessage('requestUser', {
        hmac,
        nonce,
        makairaHmac,
      })
    }
  }, [hmac, makairaHmac, nonce, token, appType, slug])

  const handleResponseUserRequest = (data: ResponseUserRequestPayload) => {
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
        addMessageListener,
        sendMessage,
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
