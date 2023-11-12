import Image from 'next/image'
import AnimateIn from '../components/AnimateIn'

const ImageLayout = ({ image, index, handleOnClick }) => {
  return (
    <a href={image}>
      <AnimateIn delay={index * 1000} className={`relative h-full w-full max-h-[700px] aspect-square delay-[${index * 1000}}ms]`} >
        <Image alt={image} src={image + '?w=1000&h=1000'} fill className={`object-cover object-center rounded shadow`} />

        {/* IMAGE OVERLAY */}
        <div className='absolute cursor-pointer bg-secondary-500 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
      </AnimateIn >
    </a>
  )
}

export default ImageLayout
