import React from 'react'
import Image from 'next/image'
import Video from './Video'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === "video") {
        return (
          <Video
            key={node.data.target.fields.title}
            title={node.data.target.fields.title}
            link={node.data.target.fields.youTubeLink}
          />
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName } = node.data.target.fields.file
      return (
        <Image
          src={`https:${url}`}
          alt={fileName}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
        />
      )
    },
  },
}

const TextLayout = ({
  text,
  type = 'dynamic',
  className
}) => {
  let textLength = 0

  text?.content.forEach(t => {
    if (t.nodeType !== 'paragraph') return

    t.content.forEach((v) => {
      const value = v?.value?.length

      if (typeof value === 'number') {
        textLength = textLength + value
      }
    })
  })

  const textContent = text.content.filter((v) => {
    if (v.nodeType !== 'paragraph') return true

    return v.content[0].value.length > 0
  })

  const textDocument = {
    ...text,
    content: textContent
  }

  const maxLengthForTwoColumns = 2500

  if (textLength < maxLengthForTwoColumns || type === 'single') {
    return (
      <div className={`prose py-0 my-0 max-w-4xl prose-img:roundedShadow prose-img:shadow-md leading-[2.1rem] tracking-wider font-open text-center prose-headings:font-josefin prose-blockquote:border-primary-500 prose-blockquote:border-opacity-10 prose-blockquote:opacity-80 prose-blockquote:rounded prose-a:text-accent-500 flex flex-col items-center justify-center prose-blockquote:my-0 prose-p:my-0 prose-headings:my-0 space-y-6 ${className}`}>
        {documentToReactComponents(textDocument, options)}
      </div>
    )
  }

  return (
    <div className={`py-0 my-0 prose max-w-7xl lg:columns-2 gap-10 prose-img:rounded prose-img:shadow-md leading-loose text-center md:text-justify prose-headings:underline prose-a:text-accent-500 ${className}`}>
      {documentToReactComponents(textDocument, options)}
    </div>
  )
}

export default TextLayout
