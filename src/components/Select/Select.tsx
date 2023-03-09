import React from 'react'
import RcSelect, {
  Option,
  OptGroup,
  SelectProps as RcSelectProps,
} from 'rc-select'
import { Text } from '@/components'
import { FaTimes, FaAngleDown } from 'react-icons/fa'
import styles from './Select.module.scss'
import csx from 'classnames'

export type SelectOption = {
  value: string
  label: string
}

export interface SelectProps extends RcSelectProps {
  customDropdownPlacement?: 'bottomLeft' | 'topLeft'
  size?: 'normal' | 'large'
  title?: string
  description?: string
  error?: boolean
  options?: SelectOption[]
  groupOptions?: {
    label?: string
    children: SelectOption[]
  }[]
  borderless?: boolean
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

const Select: React.FC<SelectProps> = ({
  customDropdownPlacement = 'bottomLeft',
  size = 'normal',
  title,
  description,
  error,
  options = [],
  groupOptions = [],
  borderless = false,
  className,
  dropdownRender,
  ...rest
}) => {
  const classNames = csx(styles.wrapper, className, {
    [styles.borderless]: borderless || size === 'large',
    [styles.error]: error,
    [styles.large]: size === 'large',
  })

  return (
    <div className={classNames}>
      {title && <div className={styles.label}>{title}</div>}
      <RcSelect
        inputIcon={() => <FaAngleDown />}
        clearIcon={() => <FaTimes />}
        dropdownClassName={csx(
          styles.dropdown,
          size === 'large' ? styles.large : ''
        )}
        dropdownAlign={PLACEMENTS[customDropdownPlacement]}
        dropdownRender={dropdownRender}
        {...rest}
      >
        {groupOptions &&
          groupOptions.map((group) => (
            <OptGroup label={group.label} key={group.label}>
              {group.children.map((option) => (
                <Option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Option>
              ))}
            </OptGroup>
          ))}

        {options &&
          options.map((option) => (
            <Option
              value={option.value}
              key={option.value}
            >
              {option.label}
            </Option>
          ))}
      </RcSelect>
      {(description || error) && (
        <Text
          element="p"
          weight="book"
          size="bravo"
          className={styles.message}
        >
          {description || error}
        </Text>
      )}
    </div>
  )
}

Select.displayName = 'Select'
export { Select }
