import { FaArrowLeft, FaChevronDown, FaTools } from 'react-icons/fa'

import {
  PageWrapper,
  Link,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  SubMenu,
  GroupTitle,
  Text,
  Checkbox,
  Divider,
  Textarea,
  Radio,
  Collapse,
  Panel,
  Switch,
  Spinner,
  RichTextInput,
  Select,
  AutoComplete,
  Tooltip,
  Heading1,
  Heading2,
  Heading3,
  Table,
  Column,
} from '@/components'
import React, { useState } from 'react'
import { withMakaira } from '@/makaira/withMakaira'
import Pagination from '@/components/Pagination/Pagination'

export default function Example() {
  const [value, setValue] = useState('0')

  const onChange = (key: React.Key | React.Key[]) => {
    setValue(`${key}`)
  }

  return (
    <>
      <PageWrapper title="Buttons" prefix="You are looking at">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            loading
          >
            Back to homepage
          </Button>
          <br />
          <Button icon={FaArrowLeft} variant="secondary" iconPosition="right">
            Back to homepage
          </Button>
          <br />
          <Button icon={FaArrowLeft} variant="reduced" iconPosition="left">
            Back to homepage
          </Button>
          <br />
          <Button icon={FaArrowLeft} variant="primary" iconPosition="right">
            Button icon right
          </Button>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            loading
          >
            Button loading
          </Button>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            disabled
          >
            Button Disabled
          </Button>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            level={-1}
          >
            Button level -1
          </Button>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            level={0}
          >
            Button level 0
          </Button>
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            level={1}
          >
            Button level 1
          </Button>
          <Button icon={FaArrowLeft} variant="primary" iconPosition="left" />
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            loading
          />
          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            disabled
          />

          <Button
            icon={FaArrowLeft}
            variant="primary"
            iconPosition="left"
            tooltip="An additional info tooltip is displayed"
          >
            Button with tooltip
          </Button>
        </div>
      </PageWrapper>
      <PageWrapper title="Form Elements" prefix="You are looking at">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <Checkbox name="chk_01" label="Sample checkbox" />
          <Checkbox name="chk_02" label="Disabled checkbox" disabled />
        </div>
        <Divider />
        <div style={{ display: 'grid', grid: 'auto / auto auto', gridGap: 50 }}>
          <Textarea
            maxLength={200}
            maxLengthDesc={'Characters'}
            title="Textarea"
            placeholder="Textarea placeholder"
            description="Textarea description"
            value={
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur delectus doloremque ea eius iusto nam nisi officia perspiciatis quae quam, quos rem sint ullam veritatis. Consequuntur ea nesciunt nulla.'
            }
            error="Please enter the text"
            rows={5}
          />
          <Textarea
            maxLength={200}
            maxLengthDesc={'Characters'}
            title="Textarea"
            placeholder="Textarea placeholder"
            description="Textarea description"
            value={
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur delectus doloremque ea eius iusto nam nisi officia perspiciatis quae quam, quos rem sint ullam veritatis. Consequuntur ea nesciunt nulla.'
            }
            disabled
            rows={5}
          />
        </div>
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 50 }}>
          <Switch title="Switch" />
          <Switch title="Switch disabled" disabled />
          <Switch title="Switch horizontal" type="horizontal" />
        </div>
        <Divider />
        <RichTextInput label="Rich Text Input" language="en" />
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 60px' }}>
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
          <AutoComplete
            description="The selected type will be used when comparing two products."
            title="Auto Complete"
            placeholder="Choose an importer..."
            options={[
              { value: 'equals', label: 'equals' },
              { value: 'greater', label: 'greater' },
              { value: 'less', label: 'less' },
              { value: 'between', label: 'between' },
            ]}
          />
        </div>
        <Divider />
        <div
          style={{
            display: 'grid',
            grid: '50px / auto auto auto',
            gridGap: 30,
          }}
        >
          <Radio label={'Radio button'} value={'radio-1'} />
          <Radio label={'Radio button'} value={'radio-1'} disabled />
          <Radio size="large" label={'Radio button'} value={'radio-1'} />
        </div>
      </PageWrapper>
      <PageWrapper title="Menu & Dropdown" prefix="You are looking at">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          <Dropdown
            options={[
              {
                value: 1,
                label: 'Option one',
              },
              {
                value: 2,
                label: 'Option two',
              },
              {
                value: 3,
                label: 'Option three',
              },
            ]}
          >
            <Button
              icon={FaChevronDown}
              variant="secondary"
              iconPosition="right"
            >
              Menu Dropdown
            </Button>
          </Dropdown>
          <Menu mode="horizontal">
            <SubMenu
              title={<Button icon={FaTools} variant="reduced" />}
              key="Settings1"
            >
              <GroupTitle>Tools</GroupTitle>
              <SubMenu key="Importer1" title="Importer">
                <GroupTitle>Importer</GroupTitle>
                <MenuItem key="Dashboard1">Dashboard</MenuItem>
                <MenuItem key="Schedule1">Schedule</MenuItem>
                <GroupTitle>Settings</GroupTitle>
                <MenuItem key="Basics1">Basics</MenuItem>
                <MenuItem key="API-Tokens1">API-Tokens</MenuItem>
                <SubMenu key="Statistics" title="Statistics">
                  <GroupTitle>Statistics</GroupTitle>
                  <MenuItem key="Statistics1">sub Statistics 1</MenuItem>
                  <MenuItem key="Statistics2">sub Statistics 2</MenuItem>
                </SubMenu>
              </SubMenu>
              <MenuItem key="Tools/Users1">Users</MenuItem>
              <MenuItem key="Security-Manager1">Security-Manager</MenuItem>
            </SubMenu>
          </Menu>
          <Menu>
            <GroupTitle>Tools</GroupTitle>
            <SubMenu key="Importer" title="Importer">
              <GroupTitle>Importer</GroupTitle>
              <MenuItem key="Dashboard">sub Dashboard</MenuItem>
              <MenuItem key="Schedule">sub Schedule</MenuItem>
              <MenuItem key="Logs">sub Logs</MenuItem>
              <GroupTitle>Settings</GroupTitle>
              <MenuItem key="Basics">sub Basics</MenuItem>
              <MenuItem key="API-Tokens">sub API-Tokens</MenuItem>
              <MenuItem key="Reset">sub Reset</MenuItem>
            </SubMenu>
            <MenuItem key="Tools/Users">Users</MenuItem>
            <MenuItem key="Security-Manager">Security-Manager</MenuItem>
            <MenuItem key="Backup :hover">Backup :hover</MenuItem>
            <SubMenu key="Statistics" title="Statistics">
              <GroupTitle>Statistics</GroupTitle>
              <MenuItem key="Statistics1">sub Statistics 1</MenuItem>
              <MenuItem key="Statistics2">sub Statistics 2</MenuItem>
            </SubMenu>
            <GroupTitle>Settings</GroupTitle>
            <MenuItem key="General">General</MenuItem>
            <MenuItem key="Users">Users</MenuItem>
            <MenuItem key="Deployment">Deployment</MenuItem>
          </Menu>
        </div>
      </PageWrapper>
      <PageWrapper title="Collapse" prefix="You are looking at">
        <div
          style={{
            display: 'grid',
            grid: 'auto / auto auto auto',
            gridGap: 30,
          }}
        >
          <Collapse>
            <Panel header="This is panel">
              <Text element="p">This is paragraph 1</Text>
              <Text
                element="p"
                size="charlie"
                className="action-layer__content"
              >
                This is paragraph 2
              </Text>
            </Panel>
          </Collapse>

          <Collapse type="arrow" title="This is collapse">
            <Panel header="This is panel 1" type="arrow">
              <Text element="p">This is paragraph 1</Text>
              <Text
                element="p"
                size="charlie"
                className="action-layer__content"
              >
                This is paragraph 2
              </Text>
            </Panel>
            <Panel header="This is panel 2" type="arrow">
              <Text element="p">This is paragraph 1</Text>
              <Text
                element="p"
                size="charlie"
                className="action-layer__content"
              >
                This is paragraph 2
              </Text>
            </Panel>
          </Collapse>

          <Collapse
            type="radio"
            onChange={onChange}
            value={value}
            activeKey={[value]}
          >
            <Panel value={'1'} header="This is panel 1" key={1}>
              <Text element="p">This is panel 1</Text>
            </Panel>

            <Panel value={'2'} header="This is panel 2" key={2}>
              <Text element="p">This is panel 2</Text>
            </Panel>
          </Collapse>
        </div>
      </PageWrapper>
      <PageWrapper title="Headings" prefix="You are looking at">
        <Heading1>Page Heading Main H1</Heading1>
        <Heading2>Page Heading Main H2</Heading2>
        <Heading3>Page Heading Main H3</Heading3>
      </PageWrapper>
      <PageWrapper title='Table' prefix='You are looking at'>
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
            { title: "value", dataIndex: "value", key: "value" }
          ]}
          pagination={{
            initialCurrentPage: 8,
            maxPage: 12,
            onPageSwitch: () => { }
          }}
        >
        </Table>
      </PageWrapper>
      <PageWrapper title='Pagination' prefix='You are looking at'>
        <Pagination initialCurrentPage={8} maxPage={12} onPageSwitch={() => { }} />
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = withMakaira()
