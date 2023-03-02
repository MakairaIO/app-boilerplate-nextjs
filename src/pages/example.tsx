import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Textarea } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

      <Textarea 
        maxlength={200}
        maxlengthDesc={'Characters'}
        title="Textarea"
        placeholder='Textarea placeholder'
        description='Textarea description'
        value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur delectus doloremque ea eius iusto nam nisi officia perspiciatis quae quam, quos rem sint ullam veritatis. Consequuntur ea nesciunt nulla.'}
        error="Please enter the text"
        rows={5}
      />

      <Textarea 
        maxlength={200}
        maxlengthDesc={'Characters'}
        title="Textarea"
        placeholder='Textarea placeholder'
        description='Textarea description'
        value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur delectus doloremque ea eius iusto nam nisi officia perspiciatis quae quam, quos rem sint ullam veritatis. Consequuntur ea nesciunt nulla.'}
        disabled
        rows={5}
      />
     
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
