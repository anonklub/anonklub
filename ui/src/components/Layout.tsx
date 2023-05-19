import { Footer, Header } from '@components'

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-124px)]'>{children}</main>
      <Footer />
    </div>
  )
}
