import { FC } from 'react';
import classNames from 'classnames'
import RcSwitch, { SwitchChangeEventHandler } from 'rc-switch'
import styles from '@/components/Switch/Switch.module.scss'
import "rc-switch/assets/index.css"

export type SwitchProps = {
  id?: string
  title?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: SwitchChangeEventHandler;
  /**
   * Default: vertical
   */
  type?: 'vertical' | 'horizontal',
  className?: string;
}

const Switch: FC<SwitchProps> = ({
  id,
  title,
  defaultChecked,
  checked,
  disabled,
  onChange,
  type = 'vertical',
  className,
}) => {

  return (
    <div
      className={classNames('switch-input', styles['switch-input'], styles[`switch-input--${type}`], className)}
    >
      {title && <div className={classNames('label', styles["switch-input__label"])}>{title}</div>}
      <RcSwitch
        id={id}
        title={title}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export {
  Switch,
}