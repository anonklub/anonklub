'use client'
import '../globals.css'
import 'nes.css/css/nes.min.css'
import 'tailwindcss/tailwind.css'
import { StoreProvider } from 'easy-peasy'
import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import config from '#/config'
import { wagmiConfig } from '#/wagmi'
import { store } from '@/store'
import { Layout, Web3Modal } from '@components'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>{config.appTitle}</title>
      </head>
      <body className='m-3'>
        <WagmiConfig config={wagmiConfig}>
          <StoreProvider store={store}>
            <Layout>{children}</Layout>
          </StoreProvider>
        </WagmiConfig>
        <Web3Modal />
      </body>
    </html>
  )
}
