import { useMakairaConfig } from '@/makaira/MakairaConfigProvider'
import { CloudinaryImage, ImageOptions } from '@/types/Cloudinary'
import classNames from 'classnames'



type ImageDetail = {
  src: CloudinaryImage | null
  alt?: string
}

type ImageProps = {
  image: ImageDetail
  isLazyLoad?: boolean
  className?: string
  options?: ImageOptions
}

function Image(props: ImageProps) {
  const { getImageLinks } = useMakairaConfig()

  const { image, isLazyLoad = true, className = '', options } = props
  const { src = '', alt = '' } = image || {}

  const _options: any = options || {
    mobile: {
      source: src,
      height: 425,
    },
    desktop: {
      source: src,
      height: 650,
    },
  }

  const imageLinks = getImageLinks(_options)

  return (
    <picture className={classNames(className, 'image')}>
      <source
        media="(min-width: 1024px)"
        srcSet={`${imageLinks.desktop?.origin} 1x, ${imageLinks?.desktop?.retina} 2x`}
      />
      <source
        srcSet={`${imageLinks?.mobile?.origin || ''} 1x, ${imageLinks?.mobile?.retina || ''} 2x`}
      />
      {isLazyLoad ? (
        <img src={imageLinks?.desktop?.retina || ''} alt={alt} loading="lazy" />
      ) : (
        <img src={imageLinks?.desktop?.retina || ''} alt={alt} />
      )}
    </picture>
  )
}

export default Image
