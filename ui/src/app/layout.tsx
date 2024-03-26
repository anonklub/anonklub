'use client'
import '../globals.css'
import 'tailwindcss/tailwind.css'
import { Bubble } from '@typebot.io/nextjs'
import { StoreProvider } from 'easy-peasy'
import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { config, wagmiConfig } from '#'
import { store } from '@/store'
import { Layout, Web3Modal } from '@components'

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<title>{config.appTitle}</title>
			</head>
			<body className='mx-10 my-3 bg-black text-grey'>
				<div className='background-image' />
				<WagmiConfig config={wagmiConfig}>
					<StoreProvider store={store}>
						<Layout>{children}</Layout>
					</StoreProvider>
				</WagmiConfig>
				<Web3Modal />
				<Bubble
					typebot={config.typebot}
					theme={{ button: { backgroundColor: '#f9f9f9' } }}
				/>
			</body>
		</html>
	)
}
