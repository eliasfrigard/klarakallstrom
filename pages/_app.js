import '../styles/globals.css'

import Script from 'next/script'

import { Montserrat, Libre_Baskerville } from 'next/font/google'

const mont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mont',
})

const basker = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quattro',
})

function MyApp({ Component, pageProps }) {
  return (
    <div id='__next' className={` ${mont.variable} ${basker.variable}`}>
      <Script src='/static/script.js' />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
