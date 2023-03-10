import React from 'react'
import styles from '@/components/Badge/Badge.module.scss'
import csx from 'classnames'
import { Text } from '../Text/Text'
import { IconType } from 'react-icons/lib'

interface BadgeProps {
  type?: 'primary' | 'secondary' | 'success'
  icon?: IconType
  text?: string
  className?: string
  spin?: boolean
}

const Badge: React.FC<BadgeProps> = ({
  type = 'primary',
  icon,
  text,
  spin = false,
  className,
}) => {
  const iconOnly = !text && icon
  const classes = csx(styles.wrapper, styles[type], className, {
    [styles.iconOnly]: iconOnly,
  })

  const getIcon = () => {
    if (icon) {
      const Icon = icon
      return (
        <span className={csx(styles.icon, { [styles.spin]: spin })}>
          <Icon />
        </span>
      )
    }
    return <></>
  }

  return (
    <div className={classes}>
      {getIcon()}
      {text && (
        <Text element="span" size="bravo" className={styles.text}>
          {text}
        </Text>
      )}
    </div>
  )
}

Badge.displayName = 'Badge'
export { Badge }
