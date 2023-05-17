import 'nes.css/css/nes.min.css'
import 'tailwindcss/tailwind.css'
import '../globals.css'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '#/wagmi'
import useReady from '@/hooks/useReady'
import Web3Modal from '@/modals/Web3Modal'
import Layout from '@components/Layout'

export default function App({ Component, pageProps }) {
  const ready = useReady()

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
      ) : null}
      <Web3Modal />
    </>
  )
}
