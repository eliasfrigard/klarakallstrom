import Layout from '../components/layouts/Default'
import Events from '../components/Events'
import Hero from '../components/Hero'
import AnimateIn from '../components/Animate'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  var currentDate = new Date().toISOString()

  const upcomingConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: 'fields.dateTime',
    'fields.dateTime[gte]': currentDate,
  })

  const previousConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: '-fields.dateTime',
    'fields.dateTime[lte]': currentDate,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'concertsPage',
  })

  const page = pageRes.items[0].fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero
    ? 'https:' + page?.mobileHero?.fields?.file?.url
    : null

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page?.title,
      concerts: {
        upcoming: upcomingConcertsRes?.items || [],
        previous: previousConcertsRes?.items || [],
      },
    },
  }
}

export default function Concerts({
  pageTitle,
  hero,
  mobileHero,
  concerts,
}) {
  return (
    <Layout
      pageTitle={pageTitle}
      imageUrl={hero}
      pageUrl='/concerts'
      pageDescription=""
    >
      {hero && (
        <Hero
          altText='Hero Image'
          heroPosition='center'
          desktopImg={hero}
          mobileImg={mobileHero}
        >
          <AnimateIn classes="centerContent flex-col text-primary-500 tracking-widest font-cursive delay-[1000ms]">
            <h1 className="text-6xl lg:text-9xl tracking-wider drop-shadow-sm">Concerts</h1>
          </AnimateIn>
        </Hero>
      )}

      <Events concerts={concerts} email='klaralovisa.kallstrom@gmail.com' />
    </Layout>
  )
}
