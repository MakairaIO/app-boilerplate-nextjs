import csx from 'classnames'
import React, { FunctionComponent } from 'react'
import { IconType } from 'react-icons/lib'

import { Spinner } from '@/components'
import styles from '@/components/Button/Button.module.scss'

type ButtonProps = React.PropsWithChildren<{
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: Function
  icon?: IconType
  variant?: 'secondary' | 'reduced' | 'primary'
  level?: -1 | 0 | 1
  iconPosition?: 'right' | 'left'
}>

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  onClick = () => {},
  disabled = false,
  loading = false,
  icon,
  variant = 'secondary',
  level = 0,
  iconPosition = 'right',
}) => {
  const classes = csx(
    styles.button,
    {
      [styles[variant]]: variant,
      [styles[`level-${level}`]]: level,
      [styles.icon]: icon,
      [styles[`icon--${iconPosition}`]]: icon && iconPosition && children,
      [styles.loading]: loading,
    },
    className
  )

  const Icon = icon

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={() => onClick()}
      className={classes}
    >
      <>
        {loading && <Spinner className={styles.spinner} size="small" />}

        {children && <span>{children}</span>}

        {icon && (
          <div className={styles.buttonIcon}>
            {/* @ts-ignore */}
            <Icon />
          </div>
        )}
      </>
    </button>
  )
}

export { Button }
