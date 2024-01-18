import Image from 'next/image'

import AnimateIn from '../components/AnimateIn'

const Hero = ({ children, className, desktopImg, mobileImg, overlay = true }) => {
  return (
    <AnimateIn className={className}>
      <div id='hero' className='relative h-screen -mt-[75px] flex justify-center items-center shadow-lg'>
        <Image
          alt={desktopImg.altText}
          src={desktopImg.image + '?w=800'}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className={`hidden md:block object-cover`}
          placeholder={desktopImg?.blur ? 'blur' : 'empty'}
          blurDataURL={desktopImg?.blur}
        />

        <Image
          alt={mobileImg.altText}
          src={mobileImg.image + '?w=600'}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className='md:hidden object-cover object-bottom'
          placeholder={mobileImg?.blur ? 'blur' : 'empty'}
          blurDataURL={mobileImg?.blur}
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
