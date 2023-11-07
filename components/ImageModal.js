import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { BiSolidDownload } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const ImageModal = ({ isOpen, handleClose, handleNext, handlePrev, image, isFirst, isLast }) => {
  const downloadImage = () => {
    fetch('https://' + image.url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob)

        const a = document.createElement('a')

        a.href = blobUrl
        a.download = image.fileName
        a.style.display = 'none'

        document.body.appendChild(a)

        a.click()

        URL.revokeObjectURL(blobUrl)
        document.body.removeChild(a)
      })
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className='w-screen h-screen z-50 fixed inset-0 flex items-center justify-center px-32 py-16 bg-secondary-500 bg-opacity-30 backdrop-blur-sm'>
      <Dialog.Panel className='relative w-full h-full border-8 border-primary-500 border-opacity-80 roundedShadow'>
        <Image
          alt={image.fileName}
          src={'https://' + image.url}
          fill
          className={`object-cover object-center`}
        />

        <div className='absolute top-5 right-7 text-3xl text-primary-500 flex gap-3'>
          <BiSolidDownload
            className='opacity-70 hover:opacity-100 duration-200 cursor-pointer'
            onClick={() => {
              downloadImage()
            }}
          />
          <AiOutlineClose onClick={handleClose} className='opacity-70 hover:opacity-100 duration-200 cursor-pointer' />
        </div>

        {!isFirst && (
          <div className='absolute left-5 h-full text-4xl text-primary-500 flex flex-col justify-center'>
            <AiOutlineArrowLeft onClick={handlePrev} className='opacity-70 hover:opacity-100 duration-200 cursor-pointer' />
          </div>
        )}

        {!isLast && (
          <div className='absolute right-5 h-full text-4xl text-primary-500 flex flex-col justify-center'>
            <AiOutlineArrowRight onClick={handleNext} className='opacity-70 hover:opacity-100 duration-200 cursor-pointer' />
          </div>
        )}
      </Dialog.Panel>
    </Dialog>
  )
}

export default ImageModal
