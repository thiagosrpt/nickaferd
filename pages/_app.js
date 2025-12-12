import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '../components/Header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
