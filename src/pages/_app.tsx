import type { AppProps } from 'next/app'
import { MakairaAppProvider } from '@/makaira/MakairaAppProvider'
import { MakairaConfigProvider } from '@/makaira/MakairaConfigProvider'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'

import '@/styles/mixins.scss'
import '@/styles/globals.scss'
import '@/styles/DatetimePicker.scss'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { slug, appType } = router.query

  return (
    <main>
      <MakairaAppProvider {...pageProps} slug={slug} appType={appType}>
        <MakairaConfigProvider>
          <Component {...pageProps} />
        </MakairaConfigProvider>
      </MakairaAppProvider>
      <ToastContainer />
    </main>
  )
}
