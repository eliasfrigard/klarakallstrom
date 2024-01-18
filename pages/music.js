import Hero from '../components/Hero'
import Layout from '../components/layouts/Default'
import AnimateIn from '../components/Animate'
import TextLayout from '../components/TextLayout'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'musicPage',
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
      pageTitle: page.title,
      text: page.text,
    },
  }
}

const Music = ({
  hero,
  mobileHero,
  pageTitle,
  text,
}) => {
  return (
    <Layout
      pageTitle={pageTitle}
      imageUrl={hero.image}
      pageUrl="/about"
      pageDescription="Music"
    >
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        {hero && (
          <Hero
            heroPosition='center'
            desktopImg={hero}
            mobileImg={mobileHero}
          >
            <div className="flex text-4xl sm:text-6xl lg:text-8xl tracking-wider opacity-80 font-josefin text-primary-500 uppercase font-bold drop-shadow">
              <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>M</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>u</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>s</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>i</h1></AnimateIn>
              <AnimateIn classes="duration-[1500ms] delay-[1000ms]"><h1>c</h1></AnimateIn>
            </div>
          </Hero>
        )}

        <div className='container centerContent flex-col gap-0 md:gap-16 px-6 py-8 lg:px-0 md:py-16'>
          <TextLayout type="single" text={text} />
        </div>
      </div>
    </Layout>
  )
}

export default Music
