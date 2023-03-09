import React from 'react'
import csx from 'classnames'
import RcTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import styles from './Tooltip.module.scss'

interface TooltipProps {
  overlay: (() => React.ReactNode) | React.ReactNode
  defaultVisible?: boolean
  visible?: boolean
  placement?: string
  overlayClassName?: string
  children?: React.ReactElement
  zIndex?: number
}

const Tooltip: React.FC<TooltipProps> = ({ children, ...rest }) => {
  return (
    <RcTooltip overlayClassName={styles.tooltipOverlay} {...rest}>
      {children}
    </RcTooltip>
  )
}

Tooltip.displayName = 'Tooltip'
export { Tooltip }
