import csx from 'classnames'
import React, { FunctionComponent } from 'react'

import { Text } from '@/components'
import styles from '@/components/PageWrapper/PageTitle.module.scss'

type PageTitleProps = React.PropsWithChildren<{
  className?: string
  prefix?: string
  suffix?: string
}>

const PageTitle: FunctionComponent<PageTitleProps> = ({
  className,
  children,
  prefix,
  suffix,
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
        <Text element="p" className={styles.title} size="golf" weight="heavy">
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
    </div>
  )
}

export default PageTitle
