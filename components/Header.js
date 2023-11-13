import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

import Hamburger from './Hamburger.js'

export default function Header() {
  const router = useRouter()

  const [currentYear, setCurrentYear] = React.useState('')
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const activeLinkStyling = (path) => {
    if (router.pathname == path) {
      return 'text-accent-500'
    }
  }

  React.useEffect(() => {
    const year = new Date().getFullYear()
    setCurrentYear(year.toString())
  }, [])

  const pageName = 'Klara Källström'
  const emailAddress = 'klaralovisa.kallstrom@gmail.com'

  const socialMedia = {
    email: `mailto:${emailAddress}?subject=${pageName} Website`,
    facebook: '',
    instagram: 'https://www.instagram.com/klara.lovisa.kallstrom',
    spotify: 'https://open.spotify.com/artist/2BO68kQDAyOLWpxAR1JQUV?si=3u0fwt9oSu-FpLsZgrkAFg',
    youtube: 'https://www.youtube.com/@klarakallstrom6799'
  }

  const links = [
    {
      href: '/',
      label: 'home'
    },
    {
      href: '/about',
      label: 'about'
    },
    {
      href: '/music',
      label: 'music'
    },
    {
      href: '/concerts',
      label: 'concerts',
    },
    {
      href: '/gallery',
      label: 'gallery'
    },
    {
      href: '/contact',
      label: 'contact'
    }
  ]

  return (
    <>
      <div
        className={`w-full backdrop-blur flex justify-start fixed top-0 items-center z-50 bg-[#260F0D] bg-opacity-90
    `}
      >
        <div
          className={`
          hidden
          lg:gap-16
          lg:flex
          justify-between
          items-center
          h-[75px]
          w-full
          shadow-lg
          tracking-wide
          text-primary-500
          container
          px-8
        `}
        >
          <div id='left'>
            <Link className='cursor-pointer text-2xl font-cursive tracking-widest' href='/'>
              {pageName}
            </Link>
          </div>
          <div id='center' className='flex text-sm gap-4 font-medium justify-center tracking-widest'>
            {
              links.map((link) => (
                <Link key={link.href} href={link.href} className={`${activeLinkStyling(link.href)} desktopNavLink uppercase`}>
                  {link.label}
                </Link>
              ))
            }
          </div>
          <div id='right' className='flex gap-6 justify-end items-center'>
            {
              socialMedia.email && (
                <a href={socialMedia.email}>
                  <AiOutlineMail className='soMeIcon text-[1.4rem] antialiased' />
                </a>
              )

            }
            {
              socialMedia.facebook && (
                <a href={socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
                  <BsFacebook className='soMeIcon text-lg' />
                </a>
              )
            }
            {
              socialMedia.instagram && (
                <a href={socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
                  <BsInstagram className='soMeIcon text-lg' />
                </a>
              )
            }
            {
              socialMedia.spotify && (
                <a
                  href={socialMedia.spotify} target='_blank' rel='noopener noreferrer'
                >
                  <BsSpotify className='soMeIcon text-lg' />
                </a>
              )
            }
            {
              socialMedia.youtube && (
                <a href={socialMedia.youtube} target='_blank' rel='noopener noreferrer'>
                  <BsYoutube className='soMeIcon text-[1.4rem] translate-y-[1px]' />
                </a>
              )
            }
          </div>
        </div>
      </div>

      {/* MOBILE */}

      <div className={`w-screen flex justify-start fixed items-center z-50 bg-secondary-500`}>
        <div
          className={`
          lg:hidden
          flex
          justify-between
          items-center
          h-[75px]
          w-full
          tracking-wide
          text-primary-500
          container
          px-8
        `}
        >
          <div id='left'>
            <Link href='/'>
              <p className='cursor-pointer font-cursive tracking-widest text-2xl'>{pageName}</p>
            </Link>
          </div>
          <div id='right' className='flex gap-6 justify-end items-center '>
            <Hamburger handleClick={toggleMobileNav} active={mobileNavOpen}></Hamburger>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed flex flex-col justify-evenly items-center pt-[75px] h-screen w-screen bg-secondary-500 z-40 duration-300 transform ${!mobileNavOpen && '-translate-y-[100vh]'
          }`}
      >
        <div className='container flex flex-col justify-center items-center gap-8'>
          {
            links.map((link) => (
              <Link key={link.href} href={link.href} className={`${activeLinkStyling(link.href)} mobileNavLink capitalize`}>
                {link.label}
              </Link>
            ))
          }
        </div>

        <div className='flex justify-center items-center gap-8 text-primary-500'>
          {
            socialMedia.email && (
              <a href={socialMedia.email}>
                <AiOutlineMail className='soMeIcon text-[1.5rem] antialiased' />
              </a>
            )

          }
          {
            socialMedia.facebook && (
              <a href={socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
                <BsFacebook className='soMeIcon text-xl' />
              </a>
            )
          }
          {
            socialMedia.instagram && (
              <a href={socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
                <BsInstagram className='soMeIcon text-xl' />
              </a>
            )
          }
          {
            socialMedia.spotify && (
              <a
                href={socialMedia.spotify} target='_blank' rel='noopener noreferrer'
              >
                <BsSpotify className='soMeIcon text-xl' />
              </a>
            )
          }
          {
            socialMedia.youtube && (
              <a href={socialMedia.youtube} target='_blank' rel='noopener noreferrer'>
                <BsYoutube className='soMeIcon text-[1.6rem] translate-y-[1px]' />
              </a>
            )
          }
        </div>
        <div className='text-primary-500 tracking-wide text-center'>
          <p className='text-sm mb-2'>{`Copyright ${currentYear} © ${pageName}`}</p>
          <a href={socialMedia.email} className='tracking-wider text-xl font-cursive'>
            {emailAddress}
          </a>
        </div>
      </div>
    </>
  )
}
