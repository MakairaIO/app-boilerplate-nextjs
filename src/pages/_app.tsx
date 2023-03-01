import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'

import { MakairaAppProvider } from '@/makaira/MakairaAppProvider'

import type { AppProps } from 'next/app'

import '@/styles/mixins.scss'
import '@/styles/globals.scss'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <MakairaAppProvider {...pageProps}>
          <Component {...pageProps} />
        </MakairaAppProvider>
      </QueryClientProvider>
    </main>
  )
}
