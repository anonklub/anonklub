'use client'
import '../globals.css'
import 'nes.css/css/nes.min.css'
import 'tailwindcss/tailwind.css'
import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '#/wagmi'
import { Layout, Web3Modal } from '@components'
import { AnonSetProvider } from '@context/anonset'

export default function RootLayout({ children }: { children: ReactNode }) {
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
