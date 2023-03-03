import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, RichTextInput } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

      <RichTextInput label='Rich Text Input' language='en'/>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
