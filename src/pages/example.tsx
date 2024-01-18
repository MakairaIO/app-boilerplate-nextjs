import {
  FaArrowLeft,
  FaTools,
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleUp,
  FaCheckCircle,
  FaBookmark,
  FaSpinner,
  FaChessKnight,
} from 'react-icons/fa'

import { TfiAngleDown } from 'react-icons/tfi'

import {
  PageWrapper,
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
  RadioGroup,
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
  Tabs,
  ColorPicker,
  Badge,
  AppMenu,
  Statistic,
  Modal,
  ShadowScroll,
  TextInput,
  ActionLayer,
  LoadingScreen,
} from '@/components'
import React, { useState } from 'react'
import { withMakaira } from '@/makaira/withMakaira'
import Pagination from '@/components/Pagination/Pagination'
import NumberInput from '@/components/NumberInput/NumberInput'
import DatetimePicker from '@/components/DatetimePicker/DatetimePicker'

export default function Example() {
  const [value, setValue] = useState('0')
  const [number, setNumber] = useState(10)
  const [color, setColor] = useState({
    hsla: 'hsla(0, 40%, 52%, 1)',
    rgba: 'rgba(182, 84, 84, 1)',
    hex: '#b65454',
  })
  const [open, setOpen] = useState(false)
  const [showActionLayer, setShowActionLayer] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = (key: React.Key | React.Key[]) => {
    setValue(`${key}`)
  }

  const onShowLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>    
      <PageWrapper
        title="Buttons"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
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
      <PageWrapper
        title="Form Elements"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <Checkbox name="chk_01" label="Sample checkbox" description='Checkbox description' error={{ message: 'Checkbox error'}}/>
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
            error={{message: "Please enter the text"}}
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
        <RichTextInput label="Rich Text Input" language="en" description="The richtext description" error={{ message: 'The richtext error' }}/>
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
            error={{
              message: 'Required!'
            }}
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
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 50px',
            marginBottom: 30
          }}
        >
          <RadioGroup error={{ message: 'Radio group error message' }}>
            <Radio label={'Radio button'} value={'radio-1'} />
            <Radio label={'Radio button'} value={'radio-1'} disabled />
            <Radio size="large" label={'Radio button'} value={'radio-1'} />
          </RadioGroup>
        </div>

        <div>
          <NumberInput
            value={number}
            max={20}
            min={5}
            label="Number Input"
            description="Input description"
            onChange={setNumber}
          />
          <NumberInput
            value={number}
            max={20}
            min={5}
            label="Number Input"
            disabled
            style={{ marginLeft: '30px' }}
          />
          <NumberInput
            value={number}
            max={20}
            min={5}
            label="Number Input"
            style={{ marginLeft: '30px' }}
            error={{message: "The number input has error"}}
          />
           <TextInput
            label="Text Input"
            name='text'
            style={{ marginTop: '30px' }}
            error={{message: "The number input has error"}}
          />
        </div>

        <Divider />
        <div style={{ marginTop: '20px' }}>
          <ColorPicker
            onChange={setColor}
            value={color}
            description="This area is covered in mud! Be aware of crossing snakes."
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <DatetimePicker label='Datetime Picker'/>
        </div>
        <div style={{ marginTop: '20px' }}>
          <DatetimePicker label='Datetime Picker disabled' disabled />
        </div>
        <div style={{ marginTop: '20px' }}>
          <DatetimePicker label='Datetime Picker' description='Description'/>
        </div>
        <div style={{ marginTop: '20px' }}>
          <DatetimePicker label='Datetime Picker' description='Description' error={{ message: 'Error message'}}/>
        </div>
      </PageWrapper>
      <PageWrapper
        title="Menu & Dropdown"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
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
              icon={TfiAngleDown}
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
              popupClassName="submenu__lv1"
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
      <PageWrapper
        title="Collapse"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
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
      <PageWrapper
        title="Headings"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <Heading1>Page Heading Main H1</Heading1>
        <Heading2>Page Heading Main H2</Heading2>
        <Heading3>Page Heading Main H3</Heading3>
      </PageWrapper>
      <PageWrapper
        title="Table"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <h2>Table</h2>
        <Table
          data={[
            { name: 'Apple', value: '1' },
            { name: 'Banana', value: '2' },
            { name: 'Eggs', value: '3' },
          ]}
          rowKey="name"
        >
          <Column title="name" dataIndex={'name'} key="name" />
          <Column title="value" dataIndex={'value'} key="value" />
        </Table>

        <h2>Table with loading</h2>
        <Table
          data={[
            { name: 'Apple', value: '1' },
            { name: 'Banana', value: '2' },
            { name: 'Eggs', value: '3' },
          ]}
          rowKey="name"
          loading
        >
          <Column title="name" dataIndex={'name'} key="name" />
          <Column title="value" dataIndex={'value'} key="value" />
        </Table>

        <h2>Table with pagination and columns props</h2>
        <Table
          data={[
            { name: 'Apple', value: '1' },
            { name: 'Banana', value: '2' },
            { name: 'Eggs', value: '3' },
          ]}
          rowKey="name"
          columns={[
            { title: 'name', dataIndex: 'name', key: 'name' },
            { title: 'value', dataIndex: 'value', key: 'value' },
          ]}
          pagination={{
            initialCurrentPage: 8,
            maxPage: 12,
            onPageSwitch: () => {},
          }}
        ></Table>
      </PageWrapper>
      <PageWrapper
        title="Tootips"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 50,
          }}
        >
          <Tooltip
            placement="top"
            overlay={<span>An additional info tooltip is displayed</span>}
          >
            <Button icon={FaRegArrowAltCircleUp} variant="reduced" />
          </Tooltip>

          <Tooltip
            placement="bottom"
            overlay={<span>An additional info tooltip is displayed</span>}
          >
            <Button icon={FaRegArrowAltCircleDown} variant="reduced" />
          </Tooltip>

          <Tooltip
            placement="left"
            overlay={<span>An additional info tooltip is displayed</span>}
            wrapperStyle={{ marginLeft: 200 }}
          >
            <Button icon={FaRegArrowAltCircleLeft} variant="reduced" />
          </Tooltip>

          <Tooltip
            placement="right"
            overlay={<span>An additional info tooltip is displayed</span>}
          >
            <Button icon={FaRegArrowAltCircleRight} variant="reduced" />
          </Tooltip>
        </div>
      </PageWrapper>
      <PageWrapper
        title="Pagination"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <Pagination
          initialCurrentPage={8}
          maxPage={12}
          onPageSwitch={() => {}}
        />
      </PageWrapper>

      <PageWrapper title="Tabs" prefix="You are looking at">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              title: 'Tab 1',
              key: '1',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper odio eget ex tempor consequat. Aenean eu sapien facilisis odio porta ultrices non at nibh. Maecenas nec commodo dolor. Nunc in lorem eget mi aliquet molestie id non leo. Donec magna velit, suscipit ac dui sollicitudin, ornare pellentesque odio. In tempor pretium purus, vitae accumsan lectus placerat nec. Vestibulum fermentum arcu eu diam dapibus volutpat. Donec tempus efficitur turpis sit amet tristique. Etiam fermentum lectus vitae enim consequat semper ac ut nulla. Aenean eget libero id diam vehicula rhoncus nec vitae urna. Sed consectetur at nisl in tristique. Maecenas nunc nisl, semper sit amet enim non, varius hendrerit lacus. In hac habitasse platea dictumst. Nunc bibendum accumsan dolor, id consequat magna aliquet at. Aenean quis ante cursus, venenatis libero vel, ultricies lectus. Nulla purus nibh, vestibulum ac odio quis, porta efficitur ipsum. Etiam posuere accumsan cursus. Etiam efficitur libero sit amet euismod euismod. Quisque viverra consectetur dictum. Aenean vitae sapien metus. Donec vitae augue malesuada, luctus lectus semper, dictum turpis. Vivamus malesuada nisi dui, nec imperdiet velit faucibus at. Donec ut velit libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam in feugiat sem, a tincidunt magna.',
            },
            {
              title: 'Tab 2',
              key: '2',
              content: (
                <p>
                  Curabitur sed ligula sit amet quam hendrerit vulputate ut a
                  enim. In vel ullamcorper risus, eget tempor magna. Duis
                  pharetra erat nec nunc rutrum, eget ultricies purus finibus.
                  Morbi semper libero sit amet augue vehicula, nec interdum
                  risus interdum. In fermentum eu diam nec vestibulum. Cras
                  augue neque, pretium eu risus non, porta bibendum urna. Morbi
                  mollis ex lorem, eu efficitur justo ornare a. Donec sit amet
                  quam sit amet orci suscipit ultricies tempor ac metus. Nulla
                  sollicitudin nibh et odio bibendum, sed faucibus justo
                  euismod. Nam consectetur porta eleifend. Vestibulum eget dui
                  urna. Nunc id tempus tellus. Aliquam sodales elit vel lacinia
                  vulputate.
                </p>
              ),
              // disabled: true,
            },
            {
              title: 'Tab 3',
              key: '3',
              content:
                'Etiam eget consectetur sapien. Nam at sodales nulla, et sollicitudin arcu. Quisque a vulputate nisi. Vivamus consequat, ipsum eget aliquet auctor, nisi quam dapibus massa, ut dapibus elit odio quis purus. Ut id nunc quis tortor blandit tristique. Etiam sit amet eros interdum, condimentum enim quis, malesuada eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur semper sapien quis leo sodales, ut elementum sem dignissim. Pellentesque quis tellus ut libero sodales ornare. Proin maximus maximus mauris, quis accumsan ligula ullamcorper ac. Donec justo sem, aliquam suscipit nibh consequat, blandit posuere neque. Nunc vehicula ligula sit amet enim suscipit, a lacinia est malesuada. Fusce sed quam pulvinar ex ullamcorper viverra. Nullam mattis, diam ac gravida iaculis, nibh nisl aliquet erat, quis ultricies ante nisl vel elit. Nulla cursus nibh eu sapien scelerisque tincidunt.',
            },
          ]}
        ></Tabs>
      </PageWrapper>
      <PageWrapper
        title="Badges"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <Badge type="primary" text="Primary" icon={FaCheckCircle} />
          <Badge type="secondary" text="Secondary" icon={FaBookmark} />
          <Badge type="success" text="Sucess" icon={FaChessKnight} />

          <Badge type="primary" icon={FaCheckCircle} />
          <Badge type="secondary" icon={FaBookmark} />
          <Badge type="success" icon={FaChessKnight} />

          <Badge spin={true} icon={FaSpinner} />
          <Badge spin={true} type="secondary" text="Loading" icon={FaSpinner} />
          <Badge type="success" spin={true} text="Badge" icon={FaCheckCircle} />
        </div>
      </PageWrapper>
      <PageWrapper
        title="App Menu"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <AppMenu text="No badge" icon={FaBookmark} />
          <AppMenu icon={FaRegArrowAltCircleRight} />
          <AppMenu text="Text only" />
          <AppMenu
            badge={
              <Badge type="success" text="Badge only" icon={FaCheckCircle} />
            }
          />
          <AppMenu
            text="App store"
            icon={FaChessKnight}
            badge={<Badge type="success" text="Sucess" icon={FaCheckCircle} />}
          />
          <AppMenu
            text="Too long fancy text"
            icon={FaCheckCircle}
            badge={
              <Badge spin text="Loading" type="secondary" icon={FaSpinner} />
            }
          />
        </div>
      </PageWrapper>
      <PageWrapper
        title="Stastics"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, marginBottom: 30 }}>
          <Statistic
            value="940"
            title="Orders"
            text="in the last 7 days"
            status="down"
            size='small'
          />
          <Statistic
            value="€ 450.2"
            title="Conversion fee"
            text="in the last 10 days"
            status="up"
            size='small'
          />
          <Statistic
            value="34,45 %"
            title="A/B Performance"
            text="more revenue"
            status="up"
            type="secondary"
            size='small'
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, marginBottom: 30 }}>
          <Statistic
            value="940"
            title="Orders"
            text="in the last 7 days"
            status="down"
          />
          <Statistic
            value="€ 450.2"
            title="Conversion fee"
            text="in the last 10 days"
            status="up"
          />
          <Statistic
            value="34,45 %"
            title="A/B Performance"
            text="more revenue"
            status="up"
            type="secondary"
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <Statistic
            value="940"
            title="Orders"
            text="in the last 7 days"
            status="down"
            size='large'
          />
          <Statistic
            value="€ 450.2"
            title="Conversion fee"
            text="in the last 10 days"
            status="up"
            size='large'
          />
          <Statistic
            value="34,45 %"
            title="A/B Performance"
            text="more revenue"
            status="up"
            type="secondary"
            size='large'
          />
        </div>
      </PageWrapper>
      <PageWrapper
        title="Modal"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal
            onClose={() => setOpen(false)}
            visible={open}
            header={<ModalHeader />}
            footer={<ModalFooter />}
            maxHeight="300px"
            mask={true}
          >
            <ModalBody />
          </Modal>
        </div>
      </PageWrapper>
      
      <PageWrapper
        title="Action Layer"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
      <ActionLayer show={showActionLayer}/>
      <Button onClick={() => setShowActionLayer(p => !p)}>Toggle Action Layer</Button>
      </PageWrapper>
      <PageWrapper
        title="Loading Screen"
        prefix="You are looking at"
        suffix="from Makaira library"
      >
        <Button onClick={onShowLoading}>Toggle Loading Screen</Button>
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = withMakaira()

const ModalHeader = () => {
  return <div>Importassistent.</div>
}

const ModalBody = () => {
  return (
    <div>
      <div>Installieren des OXID Connect Modul in deinem OXID Shop</div>
      <div>
        Um makaira.io einsetzen zu können Ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
        ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </div>
      <div>
        Sobald Du das eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </div>
      <div>
        Um makaira.io einsetzen zu können Ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
        ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </div>
      <div>
        Sobald Du das eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </div>
      <div>
        Um makaira.io einsetzen zu können Ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
        ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </div>
      <div>
        Sobald Du das eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </div>
    </div>
  )
}

const ModalFooter = () => {
  return (
    <Button className="ia-modal__button" variant="primary">
      Erledigt! Weiter geht’s
    </Button>
  )
}
