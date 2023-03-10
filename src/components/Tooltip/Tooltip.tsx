import React, { CSSProperties, ReactHTML } from 'react'
import csx from 'classnames'
import RcTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import styles from './Tooltip.module.scss'

export interface TooltipProps {
  overlay: (() => React.ReactNode) | React.ReactNode
  defaultVisible?: boolean
  visible?: boolean
  placement?: string
  overlayClassName?: string
  children?: React.ReactElement
  zIndex?: number
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  wrapperTagName?:  keyof ReactHTML
}

const Tooltip: React.FC<TooltipProps> = ({ children, wrapperClassName, wrapperStyle, wrapperTagName = 'div', ...rest }) => {
  const Wrapper = React.createElement( wrapperTagName, { className: csx(styles.wrapper, wrapperClassName), style: wrapperStyle }, children);
  return (
    <RcTooltip overlayClassName={styles.overlay} {...rest}>
      {Wrapper}
    </RcTooltip>
  )
}

Tooltip.displayName = 'Tooltip'
export { Tooltip }
