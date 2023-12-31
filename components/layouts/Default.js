import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'

export default function Layout({ children, pageTitle, pageDescription, imageUrl, pageUrl, footer = true }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const localPageDescription = "Klara Källström är en musiker, cellist och kompositör från Ångermanland, bosatt i Stockholm. Hennes kärlek för den nordiska folkmusiken och den västerländska konstmusiken har inspirerat till hennes egenskrivna musik. I hennes kompositioner får man uppleva en bred palett av klanger, där minimalistiska mönster möter melodik och rytmik från den nordiska folkmusiken."

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const pageName = 'Klara Källström'
  const title = pageTitle + ' - ' + pageName
  const baseUrl = 'https://www.klarakallstrommusic.com'
  const faviconUrl = '/favicon.ico'

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>{title}</title>
        <link rel='icon' href={faviconUrl} />
        <link rel='canonical' href={baseUrl + pageUrl} />
        <meta name='description' content={localPageDescription} />
        <meta name='author' content='Elias Frigård' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index,follow' />
        <meta itemProp='image' content={imageUrl} />
        <meta property='og:title' content={pageTitle + ' - ' + pageName} key='title' />
        <meta property='og:description' content={localPageDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={baseUrl + pageUrl} />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      <main
        style={{ transition: 'opacity 200ms ease-out' }}
        className={`bg-primary-500 pt-[75px] fade-in ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </main>
      {footer && <Footer />}
    </>
  )
}
