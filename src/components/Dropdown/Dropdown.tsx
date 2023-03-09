import RcDropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import styles from './Dropdown.module.scss'
import { Menu, MenuItem, Text } from '@/components'
import { DropdownProps as rcDropdownProps } from 'rc-dropdown/lib/Dropdown'

interface DropdownProps extends rcDropdownProps {
  options: {
    value: string | number
    label: string
  }[]
  onSelect?: () => void
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  children,
  onSelect,
  trigger = 'click',
  ...rest
}) => {
  const menu = (
    <Menu onSelect={onSelect}>
      {options.map((option) => (
        <MenuItem key={option.value}>
          <Text weight="bold" size="bravo" className="text">
            {option.label}
          </Text>
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <RcDropdown
      trigger={trigger}
      overlay={menu}
      animation="slide-up"
      {...rest}
      overlayClassName={styles['rc-dropdown']}
    >
      {children}
    </RcDropdown>
  )
}

export { Dropdown }
