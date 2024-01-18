import React from 'react'
import RcSelect, { SelectProps as RcSelectProps } from 'rc-select'
import { Text } from '@/components'
import { TfiAngleDown, TfiClose } from 'react-icons/tfi'
import styles from './Tags.module.scss'
import csx from 'classnames'

export interface TagsProps extends RcSelectProps {
  customDropdownPlacement?: 'bottomLeft' | 'topLeft'
  size?: 'normal' | 'large'
  title?: string
  description?: string
  error?: {
    message: string
  }
  borderless?: boolean
  children?: React.ReactNode
}

const PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
}

const Tags: React.FC<TagsProps> = ({
  customDropdownPlacement = 'bottomLeft',
  size = 'normal',
  title,
  description,
  error,
  options = [],
  borderless = false,
  className,
  dropdownRender,
  children,
  ...rest
}) => {
  const classNames = csx(styles.wrapper, className, 'select', {
    [styles.borderless]: borderless || size === 'large',
    [styles.error]: error,
    [styles.large]: size === 'large',
  })

  return (
    <div className={classNames}>
      {title && <div className={csx('label', styles.label)}>{title}</div>}
      <RcSelect
        inputIcon={() => <TfiAngleDown />}
        clearIcon={() => <TfiClose />}
        mode='tags'
        tokenSeparators={[',', '\n']}
        {...rest}
      >
        {children}
      </RcSelect>

      {description && (
        <Text element="p" weight="book" size="bravo" className={styles.message}>
          {description}
        </Text>
      )}
      {error && (
        <Text
          element="p"
          weight="book"
          size="bravo"
          className={csx(styles.message, styles.errorMessage)}
        >
          {error.message}
        </Text>
      )}
    </div>
  )
}

Tags.displayName = 'Tags'
export { Tags }
