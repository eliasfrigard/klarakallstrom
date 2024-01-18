import Layout from '../components/layouts/Default'
import Events from '../components/Events'
import Hero from '../components/Hero'
import AnimateIn from '../components/Animate'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

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

  const heroUrl = 'https:' + page.hero.fields.file.url
  const mobileHeroUrl = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : heroUrl

  const heroBuffer = await getImageBuffer(heroUrl)
  const mobileHeroBuffer = await getImageBuffer(mobileHeroUrl)

  const { base64: heroBlur } = await getPlaiceholder(heroBuffer)
  const { base64: mobileHeroBlur } = await getPlaiceholder(mobileHeroBuffer)

  return {
    props: {
      hero: {
        altText: page?.hero?.fields?.title,
        blur: heroBlur,
        image: heroUrl
      },
      mobileHero: {
        altText: page?.mobileHero ? page?.mobileHero?.fields?.title : page?.hero?.fields?.title,
        blur: mobileHeroBlur,
        image: mobileHeroUrl
      },
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
      imageUrl={hero.image}
      pageUrl='/concerts'
      pageDescription="Concerts"
    >
      {hero && (
        <Hero
          heroPosition='center'
          desktopImg={hero}
          mobileImg={mobileHero}
        >
          <div className="flex text-4xl sm:text-6xl lg:text-8xl tracking-wider opacity-80 font-josefin text-primary-500 uppercase font-bold drop-shadow">
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>C</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>o</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>n</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>c</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>e</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>r</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>t</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>s</h1></AnimateIn>
          </div>
        </Hero>
      )}

      <Events concerts={concerts} email='klaralovisa.kallstrom@gmail.com' />
    </Layout>
  )
}
