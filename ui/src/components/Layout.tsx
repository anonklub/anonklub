import { Footer, Header } from '@components'

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-132px)]'>{children}</main>
      <Footer />
    </div>
  )
}
