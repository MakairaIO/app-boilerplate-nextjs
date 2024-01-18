import { FaArrowRight } from 'react-icons/fa'

import {
  Text,
  PageWrapper,
  Link,
  Button,
} from '@/components'

import styles from '@/styles/HomePage.module.scss'
import { withMakaira } from '@/makaira/withMakaira'

export default function Home() {

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
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
