import React, { FunctionComponent } from 'react'

import PageTitle from '@/components/PageWrapper/PageTitle'

import styles from '@/components/PageWrapper/PageWrapper.module.scss'
import classNames from 'classnames'

type PageWrapperProps = React.PropsWithChildren<{
  title: string | React.ReactNode
  prefix?: string
  suffix?: string
  className?: string
  actions?: React.ReactNode
}>

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  children,
  title,
  prefix,
  suffix,
  className,
  actions,
}) => {
  return (
    <>
      <PageTitle prefix={prefix} suffix={suffix} actions={actions}>
        {title}
      </PageTitle>

      <div className={classNames(styles.pageWrapper, className)}>{children}</div>
    </>
  )
}

export { PageWrapper }
