import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Checkbox, Divider } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>
      <Divider />
      <Checkbox name="chk_01" label="Sample checkbox" />
      <Checkbox name="chk_02" label="Disabled checkbox" disabled />
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
