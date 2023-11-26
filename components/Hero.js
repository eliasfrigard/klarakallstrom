import Image from 'next/image'

import AnimateIn from '../components/AnimateIn'

const Hero = ({ children, className, desktopImg, mobileImg, altText, overlay = true }) => {
  const desktopImageUrl = desktopImg ? desktopImg + '?w=800' : mobileImg + '?w=800'
  const mobileImageUrl = mobileImg ? mobileImg + '?w=600' : desktopImg + '?w=600'

  return (
    <AnimateIn className={className}>
      <div id='hero' className='relative h-screen -mt-[75px] flex justify-center items-center shadow-lg'>
        <Image
          alt={altText}
          src={desktopImageUrl}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className={`${mobileImg && 'hidden md:block'} object-cover`}
        />

        <Image
          alt={altText}
          src={mobileImageUrl}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className='md:hidden object-cover object-bottom'
        />

        {overlay && (
          <AnimateIn
            className='absolute w-full h-screen bg-secondary-500 bg-opacity-40 backdrop-blur'
          ></AnimateIn>
        )}

        <div className='z-10 pt-[75px] h-full w-full centerContent'>{children}</div>
      </div>
    </AnimateIn>
  )
}

export default Hero
