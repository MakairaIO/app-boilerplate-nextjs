import { withMakaira } from '@/makaira/withMakaira'
import { Button, Link, PageWrapper, Text } from '@/components'
import styles from '@/styles/HomePage.module.scss'
import { FaHome } from 'react-icons/fa'

export default function ContentWidget() {
  return (
      <PageWrapper title="Welcome to Makaira Content Widget">
        <Text element="p">
        This is the example entry point of your <strong>Makaira content widget</strong> that was
        build based on NextJS.
        </Text>
        <div className={styles.redirectWrapper}>
          <Link pathname="/example">
            <Button icon={FaHome} variant="primary" iconPosition='left'>
              Home
            </Button>
          </Link>
        </div>
      </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
