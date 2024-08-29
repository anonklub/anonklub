import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-132px)]'>{children}</main>
      <Footer />
    </div>
  )
}
