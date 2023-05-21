'use client'
import '../globals.css'
import 'nes.css/css/nes.min.css'
import 'tailwindcss/tailwind.css'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '#/wagmi'
import Web3Modal from '@/modals/Web3Modal'
import { Layout } from '@components'
import { AnonSetProvider } from '@context/anonset'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='m-3'>
        <WagmiConfig config={wagmiConfig}>
          <AnonSetProvider>
            <Layout>{children}</Layout>
          </AnonSetProvider>
        </WagmiConfig>
        <Web3Modal />
      </body>
    </html>
  )
}
