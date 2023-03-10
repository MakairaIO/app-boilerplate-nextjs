import React, { useId } from 'react'
import classNames from 'classnames'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

import { Text } from '@/components'
import styles from '@/components/NumberInput/NumberInput.module.scss'

type NumberInputProps = {
  description?: string;
  label?: string;
  onChange?: (number: number) => void;
  max?: number;
  min?: number;
  value: number;
  disabled?: boolean
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { 
    description = '', 
    label = '', 
    onChange = () => {}, 
    max, 
    min,
    value,
    disabled,
  } = props

  function handleChange(newValue: number) {
    if (Number.isNaN(newValue)) newValue = min || 0
    if (max !== undefined && newValue > max) {
      newValue = max
    }
    if (min !== undefined && newValue < min) {
      newValue = min
    }
    onChange(newValue)
  }

  function handleChangeUp() {
    if (disabled) return;
    const newValue = value + 1
    handleChange(newValue)
  }

  function handleChangeDown() {
    if (props.disabled) return;
    const newValue = value - 1
    handleChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10)
    handleChange(newValue)
  }

  const id = useId()

  return (
    <div className={classNames("number-input", styles.numberInput)}>
      {label && (
        <Text element="div" className={styles.label}>
          {label}
        </Text>
      )}
      <div className={styles.panel}>
        <input
          className={styles.input}
          id={"number-input-" + id}
          type="number"
          max={max}
          min={min}
          value={value}
          onChange={handleInputChange}
          disabled={props.disabled}
        />
        <div
          className={classNames(styles.controlPanel, {
            [styles.controlPanelDisabled]: props.disabled,
          })}
        >
          <button className={styles.button} onClick={handleChangeUp}>
            <FaAngleUp width={16} height={16} className={styles.buttonIcon} />
          </button>
          <button className={styles.button} onClick={handleChangeDown}>
            <FaAngleDown width={16} height={16} className={styles.buttonIcon} />
          </button>
        </div>
      </div>
      {description && (
        <div className={styles.message}>{description}</div>
      )}
    </div>
  )
}

export default NumberInput