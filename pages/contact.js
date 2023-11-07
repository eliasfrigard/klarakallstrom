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
        <div className='relative pt-[85px] w-screen h-screen z-10'>
          <AnimateIn
            delay={1000}
            className='w-full h-full centerContent flex-col text-primary-500 font-khorla tracking-widest font-bold gap-3 text-center'
          >
            <p className='text-6xl leading-tight'>Klara Källström</p>
            <p className='text-2xl'>klara.kallstrom@gmail.com</p>
            <p className='text-2xl'>+47(0)70-6691374</p>
          </AnimateIn>
        </div>
      </Hero>
    </Layout>
  )
}

export default Contact
