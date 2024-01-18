import Layout from '../components/layouts/Default'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'
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
    content_type: 'contactPage',
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
      contactInfo: page.contactInformation
    },
  }
}

const Contact = ({ hero, mobileHero, pageTitle, contactInfo }) => {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription="Contact"
      imageUrl={hero.image}
      pageUrl='/contact'
      footer={false}
    >
      <Hero
        heroPosition='center'
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <div className='relative w-full h-full z-10'>
          <AnimateIn
            className='w-full h-full centerContent flex-col text-primary-500 font-open tracking-widest gap-2 text-center px-4 delay-[1000ms]'
          >
            <TextLayout text={contactInfo} className="text-primary-500  prose-headings:text-primary-500 prose-headings:font-cursive prose-headings:text-5xl md:prose-headings:text-8xl prose-headings:font-normal leading-none prose:font-josefin prose-xl prose-p:font-josefin opacity-80" />
          </AnimateIn>
        </div>
      </Hero>
    </Layout>
  )
}

export default Contact
