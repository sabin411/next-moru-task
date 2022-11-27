import type { AppProps } from 'next/app'

// components
import NavBar from '../components/NavBar'

// styles
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <NavBar/>
    <Component {...pageProps} />
  </>
}
