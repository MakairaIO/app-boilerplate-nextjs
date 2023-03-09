import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Select } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

      <Select
        description="The selected type will be used when comparing two products."
        title="Default select"
        allowClear={true}
        showSearch={true}
        placeholder="Choose an importer..."
        options={[
          { value: 'equals', label: 'equals' },
          { value: 'greater', label: 'greater' },
          { value: 'less', label: 'less' },
          { value: 'between', label: 'between' },
        ]}
      />

      <Select
        description="The selected type will be used when comparing two products."
        title="Large select"
        showSearch={true}
        size="large"
        defaultValue={'greater'}
        placeholder="Choose an importer..."
        options={[
          { value: 'equals', label: 'equals' },
          { value: 'greater', label: 'greater' },
          { value: 'less', label: 'less' },
          { value: 'between', label: 'between' },
        ]}
      />

      <Select
        description="The selected type will be used when comparing two products."
        title="Error select"
        error={true}
        placeholder="Choose an importer..."
        options={[
          { value: 'equals', label: 'equals' },
          { value: 'greater', label: 'greater' },
        ]}
      />

      <Select
        description="The selected type will be used when comparing two products."
        title="Grouped options select"
        allowClear={true}
        showSearch={true}
        placeholder="Choose an importer..."
        groupOptions={[
          {
            label: '',
            children: [
              {
                value: '',
                label: 'Alle Importer',
              },
            ],
          },
          {
            label: 'Laufend',
            children: [
              {
                value: 'stage--oxid6--1-0',
                label: 'live - en, de',
              },
            ],
          },
          {
            label: 'Beendet',
            children: [
              {
                value: 'stage--oxid6--2-gc8j5',
                label: 'manuell - vor 6 Monaten',
              },
              {
                value: 'stage--oxid6--2-smxh5',
                label: 'manuell - vor 6 Monaten',
              },
              {
                value: 'stage--oxid6--2-vb4m2',
                label: 'manuell - vor 6 Monaten',
              },
              {
                value: 'stage--oxid6--2-x2gpl',
                label: 'manuell - vor 6 Monaten',
              },
              {
                value: 'stage--oxid6--2-p5qhk',
                label: 'manuell - vor 6 Monaten',
              },
            ],
          },
        ]}
      />

      <Select
        description="The selected type will be used when comparing two products."
        title="Disabled select"
        disabled
        placeholder="Choose an importer..."
      />

      <Select
        description="The selected type will be used when comparing two products."
        title="Empty/Borderless select"
        placeholder="Choose an importer..."
        borderless={true}
      />
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
