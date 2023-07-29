import { useQuery } from '@tanstack/react-query'
import { InferGetServerSidePropsType } from 'next'
import { FaArrowRight } from 'react-icons/fa'

import {
  Text,
  LoadingScreen,
  PageWrapper,
  Table,
  Column,
  Link,
  Button,
} from '@/components'
import useMakairaApp from '@/makaira/useMakairaApp'
import type { ProductFeed } from '@/makaira/MakairaClient'

import styles from '@/styles/HomePage.module.scss'
import { withMakaira } from '@/makaira/withMakaira'

export default function Home() {
  const { token, client: makairaClient } = useMakairaApp()

  const { isLoading, data: feeds } = useQuery({
    queryKey: ['feeds'],
    queryFn: async () => await makairaClient.fetchFeeds(),
    enabled: !!token,
  })

  if (!token || isLoading) {
    return <LoadingScreen />
  }

  return (
    <PageWrapper title="Welcome to your Makaira App">
      <Text element="p">
        This is the example entry point of your Makaira app that was build based
        on NextJS.
      </Text>
      <div className={styles.redirectWrapper}>
        <Link pathname="/example">
          <Button icon={FaArrowRight} variant="primary">
            Go to example page
          </Button>
        </Link>
      </div>

      <Table
        data={feeds ?? []}
        rowKey="id"
        onRowClick={(feed: ProductFeed) => {
          console.log(feed.id)
        }}
        showRightArrow
      >
        <Column
          dataIndex="id"
          title="ID"
          key="id"
          width={50}
          render={(value) => <Text size="bravo">{value}</Text>}
        />
        <Column
          dataIndex="name"
          title="Feed-Name"
          key="name"
          render={(value) => <Text size="bravo">{value}</Text>}
        />
        <Column
          dataIndex="user"
          title="Latest edit by"
          key="user"
          render={(value) => <Text size="bravo">{value}</Text>}
        />
      </Table>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
