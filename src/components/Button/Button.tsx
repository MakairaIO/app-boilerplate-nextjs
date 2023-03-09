import csx from 'classnames'
import React, { ExoticComponent, Fragment, FunctionComponent, MouseEventHandler } from 'react'
import { IconType } from 'react-icons/lib'

import { Spinner, TooltipProps } from '@/components'
import { Tooltip } from '@/components'
import styles from '@/components/Button/Button.module.scss'

type ButtonProps = React.PropsWithChildren<{
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  icon?: IconType
  variant?: 'secondary' | 'reduced' | 'primary'
  level?: -1 | 0 | 1
  iconPosition?: 'right' | 'left',
  tooltip?: string;
  [key: string]: any;
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
  tooltip
}) => {
  const isIconOnly = !children && icon
  const classes = csx(
    styles.button,
    {
      [styles[variant]]: variant,
      [styles[`level-${level}`]]: level,
      [styles.buttonIcon]: icon,
      [styles[`buttonIcon--${iconPosition}`]]: icon && iconPosition && children,
      [styles.loading]: loading && !isIconOnly,
      [styles.loadingIconOnly]: loading && isIconOnly,
      [styles.buttonIconOnly]: isIconOnly,
    },
    className
  )

  const Icon = icon
  let Wrapper: React.ElementType = Fragment;
  let WrapperProps: any = {}
  if (tooltip) {
    Wrapper = Tooltip
    WrapperProps.overlay = tooltip
  }

  return (
    <Wrapper {...WrapperProps}>
      <button
        type="button"
        disabled={disabled || loading}
        onClick={onClick}
        className={classes}
      >
        <>
          {loading && <Spinner className={csx(styles.icon, styles.spinner)} size="small" />}

          {children && <span>{children}</span>}

          {icon && (
            <div className={csx(styles.icon, 'icon')}>
              {/* @ts-ignore */}
              <Icon />
            </div>
          )}
        </>
      </button>
    </Wrapper>
  )
}

export { Button }
