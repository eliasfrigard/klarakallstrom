import { useState, useEffect, useCallback } from 'react'

import Layout from '../components/layouts/Default'
import Video from '../components/Video'
import ImageLayout from '../components/ImageLayout'
import ImageModal from '../components/ImageModal'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const videoRes = await contentful.getEntries({
    content_type: 'video'
  })

  const imageRes = await contentful.getAssets()

  const videos = videoRes.items.map(item => item.fields)
  const images = []

  const pageRes = await contentful.getEntries({
    content_type: 'galleryPage',
  })

  const page = pageRes.items[0].fields

  for (const image of imageRes.items) {
    const src = 'https:' + image.fields.file.url

    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    )

    const { base64 } = await getPlaiceholder(buffer)

    images.push({
      url: src,
      blur: base64
    })
  }

  return {
    props: {
      pageTitle: page.title,
      videos,
      images,
    },
  }
}

const Gallery = ({ pageTitle, videos, images }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = (index) => {
    setCurrentIndex(index)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) return prev - 1
      return prev
    })
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 < images.length) return prev + 1
      return prev
    })
  }, [images])

  useEffect(() => {
    setSelectedImage(images[currentIndex])
  }, [currentIndex, images])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        previousImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [previousImage, nextImage])

  return (
    <Layout
      pageTitle={pageTitle}
      pageUrl="/gallery"
      pageDescription=""
      imageUrl={images[0].url}
    >
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-6 md:py-16 flex flex-col gap-6 md:gap-16'>

          <div className='container flex justify-center items-center flex-wrap'>
            <div className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-6 px-2`}>
              {videos.map((video, index) => (
                <Video
                  prominent={index === 0}
                  key={video.youTubeLink}
                  title={video.name}
                  link={video.youTubeLink}
                />
              ))}
            </div>
          </div>
          <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-1 container px-2'>
            {
              images.map((image, index) => (
                <ImageLayout handleOnClick={() => handleOpenModal(index)} key={image.url} index={index} image={image} />
              ))
            }
          </div>
        </div>
      </div>

      {modalOpen && (
        <ImageModal isOpen={modalOpen} handleClose={handleCloseModal} handleNext={nextImage} handlePrev={previousImage} image={selectedImage?.url} isLast={currentIndex + 1 === images.length} isFirst={currentIndex === 0} />
      )}
    </Layout>
  )
}

export default Gallery
