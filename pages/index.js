import Layout from "../components/layouts/Default"
import Hero from "../components/Hero"
import AnimateIn from "../components/Animate"
import Video from '../components/Video'

import { createClient } from 'contentful'

export default function Home({ pageTitle, pageSlogan, hero, mobileHero, youTubeLink }) {
  return (
    <Layout
      pageTitle={pageTitle}
      imageUrl=""
      pageUrl="/"
      pageDescription=""
      footer={Boolean(youTubeLink)}
    >
      <Hero
        altText="Hero Image"
        mobileImg={mobileHero}
        desktopImg={hero}
        heroPosition="top"
      >
        <div className="centerContent flex-col gap-4 text-white tracking-widest drop-shadow-lg">
          <AnimateIn animationType="slide" classes="delay-[1500ms]">
            <h1 className="lg:text-7xl font-bold tracking-wider font-basker">KLARA</h1>
          </AnimateIn>
          <AnimateIn animationType="slide" slideDirection="right" classes="delay-[1500ms]">
            <h1 className="lg:text-7xl font-bold tracking-wider">KÄLLSTRÖM</h1>
          </AnimateIn>

          <AnimateIn animationType="slide" slideDirection="right" classes="delay-[1500ms]">
            <h2 className="lg:text-2xl font-medium tracking-wider">{pageSlogan}</h2>
          </AnimateIn>
        </div>
      </Hero>

      {
        youTubeLink && (
          <div className="container py-16">
            <Video
              prominent
              key={youTubeLink}
              title={youTubeLink}
              link={youTubeLink}
            />
          </div>
        )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'homePage',
  })

  const page = pageRes?.items[0]?.fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page?.title,
      pageSlogan: page?.slogan,
      youTubeLink: page?.youTubeVideo || null
    },
  }
}