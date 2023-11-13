import Layout from "../components/layouts/Default"
import Hero from "../components/Hero"
import AnimateIn from "../components/Animate"
import Video from '../components/Video'

import { createClient } from 'contentful'

export default function Home({ pageTitle, hero, mobileHero, youTubeLink, altYouTubeLink }) {
  return (
    <Layout
      pageTitle={pageTitle}
      imageUrl={hero}
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
          <AnimateIn animationType="slide" slideDirection="top" classes="delay-[1000ms]">
            <h1 className="text-4xl sm:text-7xl lg:text-9xl tracking-wider opacity-80">Klara Källström</h1>
          </AnimateIn>

          <div className="flex opacity-80">
            <AnimateIn classes="px-4 md:px-8 flex items-end delay-[1000ms]" animationType="slide" slideDirection="left">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">C</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin mb-[1px]">ellist</h2>
            </AnimateIn>
            <AnimateIn classes="px-4 md:px-8 border-x border-opacity-20 flex items-end delay-[1000ms]" animationType="slide" slideDirection="bottom">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">A</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin mb-[1px]">rtist</h2>
            </AnimateIn>
            <AnimateIn classes="px-4 md:px-8 flex items-end delay-[1000ms]" animationType="slide" slideDirection="right">
              <h2 className="text-xl lg:text-4xl font-bold leading-none tracking-widest font-josefin">C</h2>
              <h2 className="text-lg lg:text-3xl leading-none tracking-widest font-josefin mb-[1px]">omposer</h2>
            </AnimateIn>
          </div>

          <AnimateIn animationType="slide" slideDirection="bottom" classes="delay-[1000ms] flex gap-6">
          </AnimateIn>
        </div>
      </Hero>

      <div className="container px-2 md:px-0 py-6 md:py-16 flex flex-col gap-6 md:gap-10">
        {
          youTubeLink && (
            <div className="">
              <Video
                prominent
                key={youTubeLink}
                title={youTubeLink}
                link={youTubeLink}
              />
            </div>
          )
        }

        {
          altYouTubeLink && (
            <div className="">
              <Video
                prominent
                key={altYouTubeLink}
                title={altYouTubeLink}
                link={altYouTubeLink}
              />
            </div>
          )
        }
      </div>
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
      youTubeLink: page?.youTubeVideo || null,
      altYouTubeLink: page?.altYouTubeLink || null
    },
  }
}