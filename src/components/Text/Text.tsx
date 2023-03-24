import csx from 'classnames'
import React, { FunctionComponent } from 'react'
import styles from '@/components/Text/Text.module.scss'

export type TextSize = 'alpha' | 'bravo' | 'charlie' | 'delta' | 'echo' | 'foxtrot' | 'golf' | 'hotel' | 'india' | 'juliett'

type TextProps = React.PropsWithChildren<{
  size?: TextSize
  weight?: 'book' | 'medium' | 'bold' | 'heavy'
  className?: string
  element?: string
}>

const Text: FunctionComponent<TextProps> = ({
  size = 'charlie',
  weight = 'medium',
  className = '',
  element = 'span',
  children,
  ...rest // dangerouslySetInnerHTML etc.
}) => {
  const Element = element

  const classes = csx(
    styles.text,
    styles[`text--${size}`],
    styles[`text--${weight}`],
    className
  )

  return (
    // @ts-ignore
    <Element className={classes} {...rest}>
      {children}
    </Element>
  )
}

export { Text }
