import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type LinkProps = React.PropsWithChildren<{
  pathname?: string
}>

const Link: React.FunctionComponent<LinkProps> = ({ pathname, children }) => {
  const router = useRouter()

  return (
    <NextLink
      href={{
        pathname,
        query: router.query,
      }}
    >
      {children}
    </NextLink>
  )
}

export { Link }
