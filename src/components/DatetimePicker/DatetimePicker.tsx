import { FocusEventHandler } from 'react';
import Picker, { } from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/dateFns';
import en from 'rc-picker/lib/locale/en_US';

import styles from './DatetimePicker.module.scss'
import classNames from 'classnames';


type DatetimePickerProps = {
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  name?: string
  label?: string
  className?: string
  id?: string
  description?: string
  error?: {
    message: string
  }
}

export default function DatetimePicker(props: DatetimePickerProps) {
  const {
    disabled,
    value,
    onChange,
    onBlur,
    onFocus,
    name,
    label,
    className,
    id,
    description,
    error
  } = props

  const onPickerChange = (value: Date | null, valueStr: string) => {
    if (value) {
      onChange && onChange(value.toISOString())
    } else {
      onChange && onChange(new Date(valueStr).toISOString())
    }
  }

  const roundSecond = (date: Date) =>  {
    date.setSeconds(0)
    return date
  }

  function isValidDate(d: string) {
    return !Number.isNaN(Date.parse(d))
  }

  let controllProps = {}
  if (value) {
    const isValid = isValidDate(value)
    let date = new Date(value)
    if (!isValid) {
      date = roundSecond(new Date()) 
      onChange && onChange(date.toISOString())
    }
    controllProps= {
      value: date
    }
  }


  return (
    <div className={classNames(className, 'datetime-picker', styles.datetimePicker)}>
      {label && (
        <label className={classNames('label', styles.label)} htmlFor={name}>
          {label}
        </label>
      )}
      <Picker
        id={id}
        name={name}
        disabled={disabled}
        generateConfig={generateConfig}
        locale={en}
        picker='date'
        format={'YYYY-MM-DD HH:mm'}
        showTime={{showSecond: false, format: 'HH:mm'}}
        showNow
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onPickerChange}
        {...controllProps}
      />
       {description && (
        <div className={styles.description}>{description}</div>
      )}

      {error && (
        <div
          className={classNames(styles.description, styles.error)}
        >
          {error.message}
        </div>
      )}
    </div>

  );
}