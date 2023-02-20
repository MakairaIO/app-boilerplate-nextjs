import csx from 'classnames'
import React, { FunctionComponent } from 'react'

import { Text } from '@/components'
import styles from '@/components/Heading/Heading.module.scss'

type HeadingProps = React.PropsWithChildren<{
  className?: string
}>

const Heading1: FunctionComponent<HeadingProps> = ({ children, className }) => {
  return (
    <Text
      element="h1"
      size="golf"
      weight="heavy"
      className={csx(styles.heading, styles.headingH1, className)}
    >
      {children}
    </Text>
  )
}
const Heading2: FunctionComponent<HeadingProps> = ({ children, className }) => {
  return (
    <Text
      element="h2"
      size="foxtrot"
      weight="heavy"
      className={csx(styles.heading, styles.headingH2, className)}
    >
      {children}
    </Text>
  )
}

const Heading3: FunctionComponent<HeadingProps> = ({ children, className }) => {
  return (
    <Text
      element="h3"
      size="echo"
      weight="bold"
      className={csx(styles.heading, styles.headingH3, className)}
    >
      {children}
    </Text>
  )
}

export { Heading1, Heading2, Heading3 }
