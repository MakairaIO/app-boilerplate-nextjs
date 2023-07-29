export type CloudinaryImage = {
  cloudName: string
  fileName: string
  resourceType: string
  sort: 0
  version: string
  url?: string
}

export type CloudinaryTransformation = {
  format?: string;
  width?: string | number
  height?: string | number
  quality?: string | number
  pixelRatio?: string | number
  crop?: string 
  gravity?: string 
}

export type CloudinaryOption = CloudinaryTransformation & {
  transformationString?: string
  source: CloudinaryImage
}


export type S3File = {
  source: string
}

export type ImageOptions = {
  mobile?: S3File | CloudinaryOption
  desktop?: S3File | CloudinaryOption
}

type ImageResponsive = {
  origin: string | null
  retina: string | null
}
export type ImageLinks = {
  mobile?: ImageResponsive
  desktop?: ImageResponsive
}

export const transformationMapping: CloudinaryTransformation = {
  width: 'w',
  height: 'h',
  quality: 'q',
  pixelRatio: 'dpr',
  format: 'f',
  crop: 'c',
  gravity: 'g',
}