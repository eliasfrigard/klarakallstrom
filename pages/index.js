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
        <div className="centerContent text-center flex-col gap-3 md:gap-2 text-white tracking-widest font-josefin opacity-90">
          <div className="flex text-4xl sm:text-6xl lg:text-8xl tracking-wider opacity-80 uppercase font-bold drop-shadow">
            <AnimateIn classes="duration-[1500ms] delay-[500ms]"><h1>K</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[550ms]"><h1>l</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[600ms]"><h1>a</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[650ms]"><h1>r</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[700ms]"><h1>a</h1></AnimateIn>
            <h1 className="mx-1 md:mx-2"></h1>
            <AnimateIn classes="duration-[1500ms] delay-[800ms]"><h1>K</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[850ms]"><h1>ä</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[900ms]"><h1>l</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[950ms]"><h1>l</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>s</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1050ms]"><h1>t</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1100ms]"><h1>r</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1150ms]"><h1>ö</h1></AnimateIn>
            <AnimateIn classes="duration-[1500ms] delay-[1200ms]"><h1>m</h1></AnimateIn>
          </div>

          <div className="flex">
            <div className="text lg:text-3xl font-light leading-none tracking-wider font-josefin flex drop-shadow">
              <AnimateIn classes="duration-[1500ms] delay-[1800ms]"><h1>C</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1825ms]"><h1>e</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1850ms]"><h1>l</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1875ms]"><h1>l</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1900ms]"><h1>i</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1925ms]"><h1>s</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1950ms]"><h1>t</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1975ms]"><h1>,</h1></AnimateIn>
              <h1 className="mx-[3px] md:mx-1.5"></h1>
              <AnimateIn classes="duration-[1500ms] delay-[2000ms]"><h1>A</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2025ms]"><h1>r</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2050ms]"><h1>t</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2075ms]"><h1>i</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2100ms]"><h1>s</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2125ms]"><h1>t</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2150ms]"><h1>,</h1></AnimateIn>
              <h1 className="mx-[3px] md:mx-1.5"></h1>
              <AnimateIn classes="duration-[1500ms] delay-[2175ms]"><h1>C</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2200ms]"><h1>o</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2225ms]"><h1>m</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2250ms]"><h1>p</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2275ms]"><h1>o</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2300ms]"><h1>s</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2325ms]"><h1>e</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[2350ms]"><h1>r</h1></AnimateIn>
            </div>
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