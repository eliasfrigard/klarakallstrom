import Image from 'next/image'
import Layout from '../components/layouts/Default'
import AnimateIn from '../components/AnimateIn'
import TextLayout from '../components/TextLayout'
import Hero from '../components/Hero'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'aboutPage',
  })

  const page = pageRes.items[0].fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null

  return {
    props: {
      hero,
      mobileHero,
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
    <Layout pageTitle={pageTitle}>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='container centerContent flex-col gap-8 md:gap-16 px-6 py-8 md:px-0 md:py-16'>
          {
            mobileHero && (
              <Hero overlay={false} altText='Hero Image' heroPosition='top' mobileImg={mobileHero} className='md:hidden' />
            )
          }

          {
            hero && (
              <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video hidden md:block'>
                <Image
                  alt={hero}
                  src={hero}
                  fill
                  className={`object-cover object-center rounded shadow`}
                />
              </AnimateIn>
            )
          }

          <AnimateIn threshold={0} className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 md:px-10'>
            <TextLayout text={biography} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}

export default About
