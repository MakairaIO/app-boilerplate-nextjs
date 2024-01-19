import csx from 'classnames'
import React, { FunctionComponent } from 'react'

import { Text } from '@/components'
import styles from '@/components/PageWrapper/PageTitle.module.scss'

type PageTitleProps = React.PropsWithChildren<{
  className?: string
  prefix?: string
  suffix?: string
  actions?: React.ReactNode
}>

const PageTitle: FunctionComponent<PageTitleProps> = ({
  className,
  children,
  prefix,
  suffix,
  actions,
  ...rest
}) => {
  return (
    <div className={csx(styles.wrapper, className)} {...rest}>
      <div className={styles.prefix}>
        <Text className={styles.text} element="p" size="delta" weight="book">
          {prefix}
        </Text>
      </div>
      <div className={styles.main}>
        <Text element="p" className={styles.title} size="echo" weight="bold">
          {children}
        </Text>
      </div>
      {suffix && (
        <div className={styles.suffix}>
          <Text className={styles.text} element="p" size="delta" weight="book">
            {suffix}
          </Text>
        </div>
      )}
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageTitle
