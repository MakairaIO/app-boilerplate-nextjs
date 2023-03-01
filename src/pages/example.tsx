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
} from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>

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
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
