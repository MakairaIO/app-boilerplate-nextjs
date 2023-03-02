import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Switch } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

      <div>
        <Switch title='Switch'/>
      </div>

      <div>
        <Switch title='Switch' disabled/>
      </div>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
