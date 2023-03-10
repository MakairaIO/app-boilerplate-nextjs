import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'
import { useState } from 'react'
import NumberInput from '@/components/NumberInput/NumberInput'

export default function Example() {
  const [number, setNumber] = useState(10)
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>
      <NumberInput value={number} max={20} min={5} label="Number Input" description='Input description' onChange={setNumber}/>
      <NumberInput value={number} max={20} min={5} label="Number Input Disabled" disabled style={{marginLeft: '30px'}}/>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
