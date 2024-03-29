import React, {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react'

import { CloudinaryImage, CloudinaryOption, CloudinaryTransformation, ImageLinks, ImageOptions, S3File, transformationMapping } from '@/types/Cloudinary'
import { useMakairaApp } from './MakairaAppProvider'

export interface MakairaConfig {
  storageType?: string
  cloudinaryApiUrl?: string
  cloudinaryApiKey?: string
  cloudinaryTimestamp?: number
  cloudinaryUploadSignature?: string
  cloudinaryLoginSignature?: string
  cloudinaryPreset?: string
  cloudinaryCloudName?: string
  cloudinaryUserName?: string
  assetUrl?: string
  clientBaseurl?: string
  defaultLanguage?: string
  environment?: string
  availableLanguages: string[]
  language?: string
}

type WithState<T> = T & {
  loading: boolean
  ready: boolean
}

type WithFuncs<T> = T & {
  getImageLinks: (options: ImageOptions) => ImageLinks,
  getImageLink: (options: S3File | CloudinaryOption) => string | null,
  getVideoLink: (options: CloudinaryOption) => string,
}

type MakairaConfigProviderProps = {
  children?: React.ReactNode
}


const INIT_CONFIG = {
  storageType: undefined,
  cloudinaryApiUrl: undefined,
  cloudinaryApiKey: undefined,
  cloudinaryTimestamp: undefined,
  cloudinaryUploadSignature: undefined,
  cloudinaryLoginSignature: undefined,
  cloudinaryPreset: undefined,
  cloudinaryCloudName: undefined,
  cloudinaryUserName: undefined,
  assetUrl: undefined,
  clientBaseurl: undefined,
  defaultLanguage: undefined,
  environment: undefined,
  availableLanguages: [],
  language: undefined
}

const MakairaConfigContext = createContext<WithFuncs<WithState<MakairaConfig>>>({
  ...INIT_CONFIG,
  loading: true,
  ready: false
} as any)

const CLOUDINARY_BASE = 'https://res.cloudinary.com'

const MakairaConfigProvider: React.FC<MakairaConfigProviderProps> = ({ children }) => {
  const {
    domain,
    instance,
    token,
    client,
  } = useMakairaApp()
  const [config, setConfig] = useState<MakairaConfig>(INIT_CONFIG)
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [language, setLanguage] = useState<string>();
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (domain && instance && token && !ready) {
      fetchSettings()
    }
  }, [domain, instance, token, ready, client])

  async function fetchSettings() {
    try {
      setReady(false)
      setLoading(true)
      await Promise.all([
        fetchAvailableLanguages(),
        fetchConfig(),
      ])
      setReady(true)
    } catch (error) {
      console.debug(error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchAvailableLanguages() {
    try {
      let response = await client.fetch('languages')
      if (response.ok) {
        const languages = await response.json()
        if (Array.isArray(languages) && languages.length > 0) {
          setLanguage(languages[0])
        }
        setAvailableLanguages(languages)
      }
    } catch (error) {
      console.debug('[Example-App] fetch instance language fail', error)
    }
  }

  async function fetchConfig() {
    try {
      let makairaConfig = await client.fetch('enterprise/config')
      if (makairaConfig.ok) {
        const response = await makairaConfig.json()
        setConfig(response)
      }
    } catch (error) {
      console.debug('[Example-App] fetch instance config fail', error)
    }
  }

  const getImageLink = (options: S3File | CloudinaryOption) => {
    const { source } = options

    if (!source) return null

    if (typeof source == 'string') {
      return source.startsWith('https://') ? source : getS3Link(options as S3File)
    } else {
      // objects = cloudinary
      return getCloudinaryLink(options as CloudinaryOption)
    }
  }

  /**
   * If you want to get multiple image links at once (i.e. to define different image sources in a picture tag).
   *
   * Example Usage:
   *  const options = {
   *     mobile: {
   *       source: image,
   *       height: 500,
   *     },
   *     desktop: {
   *       source: image,
   *       width: 1400,
   *     },
   *   }
   *
   *   const imageLinks = getImageLinks(options)
   */
  const getImageLinks = (options: ImageOptions = {}) => {
    let imageLinks: ImageLinks = {}

    for (const [key, value] of Object.entries(options)) {
      imageLinks[`${key}` as keyof ImageLinks] = {
        origin: getImageLink({ ...value }),
        retina: getImageLink({ ...value, pixelRatio: 2 }),
      }
    }

    return imageLinks
  }

  const getVideoLink = (options: CloudinaryOption) => {
    return getCloudinaryLink(options)
  }

  const getS3Link = (options: S3File) => {
    const { source = '' } = options

    const { assetUrl } = config

    return assetUrl + '/' + source
  }

  const getCloudinaryLink = (options: CloudinaryOption) => {
    const { source = {}, transformationString = '', ...rest } = options

    const { cloudName, resourceType, fileName, version } = source as CloudinaryImage

    // Use cloudinary format "auto" unless otherwise stated
    if (rest.format === undefined) {
      rest.format = 'auto'
    }

    const transformations = getCloudinaryTransformations(rest)

    const versionStr = version
      ? version.toString().startsWith('v')
        ? version
        : `v${version}`
      : null

    // Example: https://res.cloudinary.com/makairafm/image/upload/<transformations>v1592420992/<fileName>
    const parts = [
      CLOUDINARY_BASE,
      cloudName,
      resourceType,
      'upload',
      transformations,
      transformationString,
      versionStr,
      encodeURIComponent(fileName),
    ].filter(Boolean) // with .filter(Boolean) we remove all empty items from the array

    return parts.join('/')
  }

  const getCloudinaryTransformations = (settings: CloudinaryTransformation) => {
    const transformations = Object.entries(settings).reduce<Array<String>>(
      (transformations, currentSetting) => {
        const [name, value] = currentSetting

        const transformationKey = transformationMapping[name as keyof CloudinaryTransformation]

        // Make sure to add only known transformations
        if (transformationKey) {
          transformations.push(`${transformationKey}_${value}`)
        }

        return transformations
      },
      []
    )

    return transformations.join(',')
  }
 
  return (
    <MakairaConfigContext.Provider
      value={{
        ...config,
        availableLanguages,
        language,
        loading,
        ready,
        getImageLink,
        getImageLinks,
        getVideoLink,
      }}
    >
      {children}
    </MakairaConfigContext.Provider>
  )
}

const useMakairaConfig = () => {
  return useContext(MakairaConfigContext)
}

export { MakairaConfigProvider, useMakairaConfig }
