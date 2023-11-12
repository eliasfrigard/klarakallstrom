import Layout from "../components/layouts/Default"
import Hero from "../components/Hero"
import AnimateIn from "../components/Animate"
import Video from '../components/Video'

import { createClient } from 'contentful'

export default function Home({ pageTitle, hero, mobileHero, youTubeLink }) {
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
        <div className="centerContent text-center flex-col gap-4 text-white tracking-widest font-cursive">
          <AnimateIn animationType="slide" slideDirection="top" classes="delay-[1500ms]">
            <h1 className="text-4xl md:text-7xl lg:text-9xl tracking-wider">Klara Källström</h1>
          </AnimateIn>

          <div className="flex">
            <AnimateIn classes="px-4 md:px-8 flex items-end delay-[1500ms]" animationType="slide" slideDirection="left">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">C</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin">ellist</h2>
            </AnimateIn>
            <AnimateIn classes="px-4 md:px-8 border-x border-opacity-20 flex items-end delay-[1500ms]" animationType="slide" slideDirection="bottom">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">A</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin">rtist</h2>
            </AnimateIn>
            <AnimateIn classes="px-4 md:px-8 flex items-end delay-[1500ms]" animationType="slide" slideDirection="right">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">C</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin">omposer</h2>
            </AnimateIn>
          </div>

          <AnimateIn animationType="slide" slideDirection="bottom" classes="delay-[1500ms] flex gap-6">
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