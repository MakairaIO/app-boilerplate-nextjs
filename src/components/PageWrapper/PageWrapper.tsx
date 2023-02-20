import React, { FunctionComponent } from 'react'

import PageTitle from '@/components/PageWrapper/PageTitle'

import styles from '@/components/PageWrapper/PageWrapper.module.scss'

type PageWrapperProps = React.PropsWithChildren<{
  title: string
  prefix?: string
}>

const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  children,
  title,
  prefix,
}) => {
  return (
    <>
      <PageTitle prefix={prefix}>{title}</PageTitle>

      <div className={styles.pageWrapper}>{children}</div>
    </>
  )
}

export { PageWrapper }
