import 'tailwindcss/tailwind.css'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '#/wagmi'
import useReady from '@/hooks/useReady'
import Web3Modal from '@/modals/Web3Modal'

export default function App({ Component, pageProps }) {
  const ready = useReady()

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}
      <Web3Modal />
    </>
  )
}
