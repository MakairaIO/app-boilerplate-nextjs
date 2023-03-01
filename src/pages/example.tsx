import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Radio, RadioGroup, Collapse, Panel, Text } from '@/components'
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
        <Radio size="large" label={'Radio button'} value={'radio-1'} />
      </div>

      <div>
        <Collapse
        >
          <Panel header="This is panel">
            <Text
              element="p"
            >
              This is paragraph 1
            </Text>
            <Text
              element="p"
              size="charlie"
              className="action-layer__content"
            >
              This is paragraph 2
            </Text>
          </Panel>
        </Collapse>
      </div>


      <div>
        <Collapse
          type='arrow'
          title='This is collapse'
        >
          <Panel header="This is panel 1" type='arrow'>
            <Text
              element="p"
            >
              This is paragraph 1
            </Text>
            <Text
              element="p"
              size="charlie"
              className="action-layer__content"
            >
              This is paragraph 2
            </Text>
          </Panel>
          
          <Panel header="This is panel 2" type='arrow'>
            <Text
              element="p"
            >
              This is paragraph 1
            </Text>
            <Text
              element="p"
              size="charlie"
              className="action-layer__content"
            >
              This is paragraph 2
            </Text>
          </Panel>
        </Collapse>
      </div>

      <div>
        <Collapse
          type='radio'
          title='Radio collapse'
        >
          <Panel header="This is panel 1" value="value1">
            <Text
              element="p"
            >
              This is paragraph 1
            </Text>
            <Text
              element="p"
              size="charlie"
              className="action-layer__content"
            >
              This is paragraph 2
            </Text>
          </Panel>

          <Panel header="This is panel 2" value="value2">
            <Text
              element="p"
            >
              This is paragraph 1
            </Text>
            <Text
              element="p"
              size="charlie"
              className="action-layer__content"
            >
              This is paragraph 2
            </Text>
          </Panel>
        </Collapse>
      </div>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
