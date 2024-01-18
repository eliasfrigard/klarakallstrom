import Image from 'next/image'
import Layout from '../components/layouts/Default'
import AnimateIn from '../components/AnimateIn'
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
    content_type: 'aboutPage',
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
      biography: page.biography,
    },
  }
}

const About = ({
  hero,
  mobileHero,
  pageTitle,
  biography,
}) => {
  return (
    <Layout
      pageTitle={pageTitle}
      imageUrl={hero.image}
      pageUrl="/about"
      pageDescription="About"
    >
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        {mobileHero &&
          (
            <div className='md:hidden h-screen -mt-[75px]'>
              <Image
                alt={mobileHero.altText}
                src={mobileHero.image}
                placeholder={mobileHero?.blur ? 'blur' : 'empty'}
                blurDataURL={mobileHero?.blur}
                fill
                className='object-cover object-bottom'
              />
            </div>
          )
        }
        <div className='container centerContent flex-col gap-0 md:gap-16 px-6 py-8 lg:px-0 md:py-16'>
          {
            hero && (
              <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video hidden md:block'>
                <Image
                  alt={hero.altText}
                  src={hero.image}
                  placeholder={hero?.blur ? 'blur' : 'empty'}
                  blurDataURL={hero?.blur}
                  fill
                  className={`object-cover object-center rounded shadow`}
                />
              </AnimateIn>
            )
          }

          <AnimateIn threshold={0} className='py-0 text-center md:text-justify leading-[2rem] tracking-wide z-10 md:px-10'>
            <TextLayout text={biography} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}

export default About
