import Footer from '@components/Footer'
import Header from '@components/Header'

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-100px)]'>{children}</main>
      <Footer />
    </div>
  )
}
