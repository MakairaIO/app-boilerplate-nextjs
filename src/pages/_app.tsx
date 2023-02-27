import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'

import { CONTENT_WIDGET_PATHS } from '@/utils/contentWidgetPaths'
import { MakairaAppProvider } from '@/makaira/MakairaAppProvider'

import '@/styles/mixins.scss'
import '@/styles/globals.scss'

const futura = localFont({
  src: [
    {
      path: '../fonts/FuturaBT-Light/font.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/FuturaBT-Book/font.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/FuturaBT-Medium/font.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/FuturaBT-Bold/font.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/FuturaBT-Heavy/font.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-family-regular',
})

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const appType = CONTENT_WIDGET_PATHS.includes(router.pathname)
    ? 'content-widget'
    : 'app'

  return (
    <main className={futura.className}>
      <QueryClientProvider client={queryClient}>
        <MakairaAppProvider {...pageProps} appType={appType}>
          <Component {...pageProps} />
        </MakairaAppProvider>
      </QueryClientProvider>
    </main>
  )
}
