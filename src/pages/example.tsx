import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Tooltip } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <div>
        <Link pathname="/">
          <Button icon={FaArrowLeft} variant="primary" iconPosition="left" loading>
            Back to homepage
          </Button>
        </Link>
        <Button icon={FaArrowLeft} variant="secondary" iconPosition="right">
          Back to homepage
        </Button>
        <Button icon={FaArrowLeft} variant="reduced" iconPosition="left">
          Back to homepage
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="right">
          Button icon right
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" loading>
          Button loading
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" disabled>
          Button Disabled
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" level={-1}>
          Button level -1
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" level={0}>
          Button level 0
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" level={1}>
          Button level 1
        </Button>
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" />
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" loading />
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" disabled />

        <Button icon={FaArrowLeft} variant="primary" iconPosition="left" tooltip='An additional info tooltip is displayed'>
          Button with tooltip
        </Button>
      </div>
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
