import React from 'react'
import styles from '@/components/AppMenu/AppMenu.module.scss'
import { IconType } from 'react-icons'
import { Text } from '../Text/Text'

interface AppMenuProps {
  icon?: IconType
  text?: string
  badge?: React.ReactElement
  onClick?: () => void
}

const AppMenu: React.FC<AppMenuProps> = ({ icon, text, badge }) => {
  const getIcon = () => {
    if (icon) {
      const Icon = icon
      return (
        <div className={styles.icon}>
          <Icon />
        </div>
      )
    }
    return <></>
  }

  return (
    <div className={styles.wrapper}>
      {getIcon()}
      {text && (
        <Text element="span" size="bravo" weight="bold" className={styles.text}>
          {text}
        </Text>
      )}
      {badge && <span className={styles.badge}>{badge}</span>}
    </div>
  )
}

AppMenu.displayName = 'AppMenu'
export { AppMenu }
