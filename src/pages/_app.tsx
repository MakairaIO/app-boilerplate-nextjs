import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'

import { getAppTypeFromPath } from '@/utils/getAppTypeFromPath'
import { MakairaAppProvider } from '@/makaira/MakairaAppProvider'
import { MakairaConfigProvider } from '@/makaira/MakairaConfigProvider'
import { LoadingScreen } from '@/components'

import '@/styles/mixins.scss'
import '@/styles/globals.scss'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { slug, appType = getAppTypeFromPath(router.pathname)  } = router.query
  
  if(!pageProps.hmac || !pageProps.makairaHmac) {
    return <LoadingScreen />
  }

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <MakairaAppProvider {...pageProps} slug={slug} appType={appType}>
          <MakairaConfigProvider>
            <Component {...pageProps}/>
          </MakairaConfigProvider>
        </MakairaAppProvider>
      </QueryClientProvider>
    </main>
  )
}
