import '../styles/globals.css'

import Script from 'next/script'
import { Open_Sans, Josefin_Sans, Alex_Brush } from 'next/font/google'

const open = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
})

const cursive = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
})


function MyApp({ Component, pageProps }) {
  return (
    <div id='__next' className={`${open.variable} ${josefin.variable} ${cursive.variable} font-open`}>
      <Script src='/static/script.js' />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
