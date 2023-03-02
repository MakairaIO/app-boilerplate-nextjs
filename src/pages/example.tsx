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
} from '@/components'
import React, { useState } from 'react'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {

  const [value, setValue] = useState('0')

  const onChange = (key: React.Key | React.Key[]) => {
    setValue(`${key}`)
  }

  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>
      <Divider />
      <Checkbox name="chk_01" label="Sample checkbox" />
      <Checkbox name="chk_02" label="Disabled checkbox" disabled />
      <Divider />
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
        <Button icon={FaChevronDown} variant="secondary" iconPosition="right">
          Menu Dropdown
        </Button>
      </Dropdown>
      <Divider />
      <Menu mode="horizontal">
        <SubMenu
          popupOffset={[-20, 0]}
          title={<Button icon={FaTools} variant="reduced" />}
          key="Settings1"
          popupClassName="page-header__popup"
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
      <Divider />
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
      <Divider />
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
      <Divider />
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
     
     <Divider />

      <Radio size="large" label={'Radio button'} value={'radio-1'} />

      <Divider />

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

      <Divider />

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

      <Divider />
      
      <Collapse
        type="radio"
        onChange={onChange}
        value={value}
        activeKey={[value]}
      >
        <Panel value={'1'} header="This is panel 1" key={1}>
          <Text
            element="p"
          >
            This is panel 1
          </Text>
        </Panel>

        <Panel value={'2'} header="This is panel 2" key={2}>
          <Text
            element="p"
          >
            This is panel 2
          </Text>
        </Panel>
      </Collapse>

      <Divider />

      <div>
        <Switch title='Switch'/>
      </div>

      <Divider />

      <div>
        <Switch title='Switch disabled' disabled />
      </div>
      <Divider />
      <div>
        <Switch title='Switch loading' loadingIcon={<Spinner />} loading/>
      </div>
      <Divider />
      <div>
        <Switch title='Switch horizontal' type="horizontal"/>
      </div>
      <Divider />
      <div>
        <Switch title='Switch small' type='vertical' size='small'/>
      </div>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
