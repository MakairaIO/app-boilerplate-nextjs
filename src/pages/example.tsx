import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Table, Column } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'
import Pagination from '@/components/Pagination/Pagination'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

      <h2>Table</h2>
      <Table data={[
        { "name": "Apple", "value": "1" },
        { "name": "Banana", "value": "2" },
        { "name": "Eggs", "value": "3" }
      ]}
        rowKey="name"
      >
        <Column title="name" dataIndex={"name"} key="name" />
        <Column title="value" dataIndex={"value"} key="value" />
      </Table>
      
      <h2>Table with loading</h2>
      <Table data={[
        { "name": "Apple", "value": "1" },
        { "name": "Banana", "value": "2" },
        { "name": "Eggs", "value": "3" }
      ]}
        rowKey="name"
        loading
      >
        <Column title="name" dataIndex={"name"} key="name" />
        <Column title="value" dataIndex={"value"} key="value" />
      </Table>

      <h2>Table with pagination and columns props</h2>
      <Table data={[
        { "name": "Apple", "value": "1" },
        { "name": "Banana", "value": "2" },
        { "name": "Eggs", "value": "3" }
      ]}
        rowKey="name"
        columns={[
          { title: "name", dataIndex: "name", key: "name" },
          { title: "value", dataIndex: "value", key: "value"}
        ]}
        pagination={{
          initialCurrentPage: 8,
          maxPage: 12,
          onPageSwitch: () => {}
        }}
      >
      </Table>

      <h2>Pagination</h2>
      <Pagination initialCurrentPage={8} maxPage={12} onPageSwitch={() => {}}/>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
