import React from 'react'
import styles from '@/components/Checkbox/Checkbox.module.scss'
import { Text } from '@/components/Text/Text'
import csx from 'classnames'

interface CheckboxProps {
  name: string
  label: string
  disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  disabled = false,
}) => {
  const classes = csx(
    styles.checkbox,
    disabled ? styles.checkbox__disabled : ''
  )

  const disabledProp = disabled ? { disabled: true } : {}

  return (
    <label className={classes} htmlFor={name}>
      <input name={name} type="checkbox" id={name} {...disabledProp} />
      <span className={styles.checkmark}></span>
      <Text className={styles.checkbox__text} weight="medium">
        {label}
      </Text>
    </label>
  )
}

Checkbox.displayName = 'Checkbox'

export { Checkbox }
