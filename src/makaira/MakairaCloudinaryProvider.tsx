import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react'
import { useMakairaConfig } from './MakairaConfigProvider'
import { CloudinaryImage } from '@/types/Cloudinary'

export type InsertedImage = {
  bytes: number
  context: object[]
  created_at: string
  derived: object[]
  format: string
  height: number
  public_id: string
  resource_type: string
  secure_url: string
  tags: string[]
  type: 'upload'
  url: string
  version: number
  width: number
}

type CloudinaryCallback = (images: Array<CloudinaryImage>) => void

interface MakairaCloudinary {
  showCloudinaryDialog: (cb: CloudinaryCallback) => void
}

type MakairaCloudinaryProviderProps = {
  children?: React.ReactNode
}

const MakairaCloudinaryContext = createContext<MakairaCloudinary>({
  showCloudinaryDialog: (cb: CloudinaryCallback) => {}
})

const EVENT_ADD_IMAGE = 'cloudinary:addimage'

const MakairaCloudinaryProvider: React.FC<MakairaCloudinaryProviderProps> = ({ children }) => {
  const {
    cloudinaryApiKey,
    cloudinaryCloudName,
    cloudinaryLoginSignature,
    cloudinaryTimestamp,
    cloudinaryUserName,
    ready,
    loading
  } = useMakairaConfig()

  const callBackRef = useRef<CloudinaryCallback>(() => {})


  function onAddingImages(agrs: CustomEventInit) {
    callBackRef.current && callBackRef.current(agrs.detail?.images)
  }

  const showCloudinaryDialog = (cb: CloudinaryCallback) => {
    callBackRef.current = cb;
    (window as any)?.ml.show()
  }

  useEffect(() => {
    if (ready && !loading) {
      (window as any).ml ||= (window as any).cloudinary.createMediaLibrary(
        {
          cloud_name: cloudinaryCloudName,
          api_key: cloudinaryApiKey,
          username: cloudinaryUserName,
          timestamp: cloudinaryTimestamp,
          signature: cloudinaryLoginSignature,
        },
        {
          insertHandler: (data: { assets: Array<InsertedImage> }) => {
            const images: Array<CloudinaryImage> = data.assets.map((image) => ({
              cloudName: cloudinaryCloudName || '',
              fileName: image.public_id + '.' + image.format,
              resourceType: image.resource_type,
              sort: 0,
              version: image.version.toString(),
            }))
            window.dispatchEvent(new CustomEvent(EVENT_ADD_IMAGE, { detail: { images } }))
          }
        }
      )

      window.addEventListener(EVENT_ADD_IMAGE, onAddingImages)
    }
    return () => {
      window.removeEventListener(EVENT_ADD_IMAGE, onAddingImages)
    }
  }, [loading, ready])

  return (
    <MakairaCloudinaryContext.Provider
      value={{
        showCloudinaryDialog
      }}
    >
      {children}
    </MakairaCloudinaryContext.Provider>
  )
}

const useMakairaCloudinary = () => {
  return useContext(MakairaCloudinaryContext)
}

export { MakairaCloudinaryProvider, useMakairaCloudinary }
