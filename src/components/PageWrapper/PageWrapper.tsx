import React, { FunctionComponent } from 'react'

import PageTitle from '@/components/PageWrapper/PageTitle'

import styles from '@/components/PageWrapper/PageWrapper.module.scss'
import classNames from 'classnames'

type PageWrapperProps = React.PropsWithChildren<{
  title: string
  prefix?: string
  suffix?: string
  className?: string
}>

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  children,
  title,
  prefix,
  suffix,
  className,
}) => {
  return (
    <>
      <PageTitle prefix={prefix} suffix={suffix}>
        {title}
      </PageTitle>

      <div className={classNames(styles.pageWrapper, className)}>{children}</div>
    </>
  )
}

export { PageWrapper }
