import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-132px)]'>{children}</main>
      <Footer />
    </div>
  )
}
