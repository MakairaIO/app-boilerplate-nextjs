import { CloudinaryImage } from "@/types/Cloudinary";
import Image from "../Image/Image";

import styles from './File.module.scss'

interface ThumbnailProps {
  image?: CloudinaryImage | null
}

export function Thumbnail(props: ThumbnailProps) {
  const { image } = props

  if (!image || Object.keys(image).length === 0) return null

  let children = null;

  if (image.url) {
    children = <Image image={{ src: image.url as any, alt: '' }} />
  } else {
    const option = {
      desktop: {
        source: image,
        height: 110
      },
      mobile: {
        source: image,
        height: 110
      }
    }
  
    children = <Image image={{ src: image, alt: '' }} options={option}/>
  }

  return (
    <div className={styles.thumbnailWrapper}>
      {children}
    </div>
  )

}