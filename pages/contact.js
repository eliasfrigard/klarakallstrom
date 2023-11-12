import Layout from '../components/layouts/Default'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'contactPage',
  })

  const page = pageRes.items[0].fields

  const hero = page?.hero ? 'https:' + page?.hero?.fields?.file?.url : null
  const mobileHero = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : null

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page.title,
    },
  }
}

const Contact = ({ hero, mobileHero, pageTitle }) => {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageTitle}
      imageUrl={hero}
      pageUrl='/concerts'
      footer={false}
    >
      <Hero
        altText='Contact Klara'
        heroPosition='center'
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <div className='relative w-full h-full z-10'>
          <AnimateIn
            delay={1000}
            className='w-full h-full centerContent flex-col text-primary-500 font-open tracking-widest font-medium gap-2 md:gap-3 text-center px-4'
          >
            <p className='text-5xl md:text-8xl leading-tight font-light font-cursive'>Klara Källström</p>
            <p className=' md:text-xl'>klaralovisa.kallstrom@gmail.com</p>
            <p className=' md:text-xl'>+46(0)70-1234567</p>
          </AnimateIn>
        </div>
      </Hero>
    </Layout>
  )
}

export default Contact
