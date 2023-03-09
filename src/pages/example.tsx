import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Tooltip } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>
      <br />
      <br />
      <Tooltip
        placement="top"
        overlay={<span>An additional info tooltip is displayed</span>}
      >
        <button>Back to homepage</button>
      </Tooltip>
      <br />
      <br />
      <Tooltip
        placement="bottom"
        overlay={<span>An additional info tooltip is displayed</span>}
      >
        <button>Back to homepage</button>
      </Tooltip>
      <br />
      <br />
      <Tooltip
        placement="left"
        overlay={<span>An additional info tooltip is displayed</span>}
      >
        <button>Back to homepage</button>
      </Tooltip>
      <br />
      <br />
      <Tooltip
        placement="right"
        overlay={<span>An additional info tooltip is displayed</span>}
      >
        <button>Back to homepage</button>
      </Tooltip>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
