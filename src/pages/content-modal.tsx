import { withMakaira } from '@/makaira/withMakaira'

import { Text } from '@/components'

export default function ContentWidget() {
  return (
    <div>
      <Text element="p">
        This is the example entry point of your Makaira content modal that was
        build based on NextJS.
      </Text>
    </div>
  )
}

export const getServerSideProps = withMakaira()
