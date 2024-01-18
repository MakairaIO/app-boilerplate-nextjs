import { useEffect, useState } from 'react'
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
import { withMakaira } from '@/makaira/withMakaira'
import { useMakairaConfig } from '@/makaira/MakairaConfigProvider'

import styles from '@/styles/HomePage.module.scss'


export default function Home() {
  const { token, client: makairaClient } = useMakairaApp()
  const { loading: loadingConfig } = useMakairaConfig()
  const [loading, setLoading] = useState(false)
  const [feeds, setFeeds] = useState([])

  const fetchFeeds = async () => {
    try {
      setLoading(true)
      const response = await makairaClient?.fetchFeeds()
      if (response.ok) {
        const data = await response.json()
        setFeeds(data)
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  if (loadingConfig || loading) {
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
