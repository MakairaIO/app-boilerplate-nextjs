import RcMenu, {
  SubMenu,
  MenuItem,
  SubMenuProps,
  MenuItemProps,
  MenuProps,
} from 'rc-menu'
import { FaChevronRight } from 'react-icons/fa'
import styles from './Menu.module.scss'
import csx from 'classnames'
import { PropsWithChildren } from 'react'
import 'rc-menu/assets/index.css'

const GroupTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="menu-v3__block-title">{children}</div>
}

const SubMenuCustom: React.FC<SubMenuProps> = ({
  title,
  children,
  className,
  ...rest
}) => {
  return (
    <SubMenu
      popupOffset={[8, 0]}
      className={csx('menu-v3__submenu', className || '')}
      title={title}
      expandIcon={<FaChevronRight className={'menu-v3__icon'} />}
      {...rest}
    >
      {children}
    </SubMenu>
  )
}

const MenuItemCustom: React.FC<MenuItemProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MenuItem className={csx('menu-v3__item', className)} {...rest}>
      {children}
    </MenuItem>
  )
}

const Menu: React.FC<MenuProps> = ({ children, className, mode, ...rest }) => {
  const rootClassName = csx(
    styles['menu-v3'],
    className || '',
    mode === 'horizontal' ? styles['menu-v3__horizontal'] : ''
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
