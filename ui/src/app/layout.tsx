'use client'
import 'nes.css/css/nes.min.css'
import 'tailwindcss/tailwind.css'
import '../globals.css'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '#/wagmi'
import useReady from '@/hooks/useReady'
import Web3Modal from '@/modals/Web3Modal'
import Layout from '@components/Layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ready = useReady()

  return (
    <html lang='en'>
      <body>
        {ready ? (
          <WagmiConfig config={wagmiConfig}>
            <Layout>{children}</Layout>
          </WagmiConfig>
        ) : null}
        <Web3Modal />
      </body>
    </html>
  )
}
