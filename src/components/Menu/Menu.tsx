import RcMenu, {
  SubMenu,
  MenuItem,
  SubMenuProps,
  MenuItemProps,
  MenuProps,
} from 'rc-menu'
import { FaChevronRight } from 'react-icons/fa'
import { TfiAngleRight } from 'react-icons/tfi'
import styles from './Menu.module.scss'
import csx from 'classnames'
import { PropsWithChildren } from 'react'
import 'rc-menu/assets/index.css'

const GroupTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.blockTitle}>{children}</div>
}

const SubMenuCustom: React.FC<SubMenuProps> = ({
  title,
  children,
  ...rest
}) => {
  return (
    <SubMenu
      popupOffset={[8, 0]}
      title={title}
      expandIcon={<TfiAngleRight className={styles.expandIcon} />}
      {...rest}
    >
      {children}
    </SubMenu>
  )
}

const MenuItemCustom: React.FC<MenuItemProps> = ({ children, ...rest }) => {
  return <MenuItem {...rest}>{children}</MenuItem>
}

const Menu: React.FC<MenuProps> = ({ children, className, mode, ...rest }) => {
  const rootClassName = csx(
    styles.wrapper,
    className,
    mode === 'horizontal' ? styles.horizontal : ''
  )
  return (
    <div className={rootClassName}>
      <RcMenu
        triggerSubMenuAction="hover"
        motion={{ motionName: 'rc-menu-open-zoom' }}
        mode={mode}
        {...rest}
        rootClassName={rootClassName}
      >
        {children}
      </RcMenu>
    </div>
  )
}

export {
  Menu,
  GroupTitle,
  MenuItemCustom as MenuItem,
  SubMenuCustom as SubMenu,
}
