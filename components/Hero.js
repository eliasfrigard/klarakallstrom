import Image from 'next/image'

import AnimateIn from '../components/AnimateIn'

const Hero = ({ children, className, desktopImg, mobileImg, altText, overlay = true }) => {
  console.log('🚀 || file: Hero.js:6 || Hero || mobileImg:', mobileImg)
  return (
    <AnimateIn className={className}>
      <div id='hero' className='relative h-screen -mt-[75px] flex justify-center items-center shadow-lg'>
        <Image
          alt={altText}
          src={desktopImg || mobileImg}
          fill
          className={`${mobileImg && 'hidden md:block'} object-cover`}
        />

        {mobileImg &&
          (
            <Image
              alt={altText}
              src={mobileImg || desktopImg}
              fill
              className='md:hidden object-cover object-bottom'
            />
          )
        }

        {overlay && (
          <AnimateIn
            className='absolute w-full h-screen bg-secondary-500 bg-opacity-40 backdrop-blur-sm'
          ></AnimateIn>
        )}

        <div className='z-10 pt-[75px] h-full w-full centerContent'>{children}</div>
      </div>
    </AnimateIn>
  )
}

export default Hero
