import { FC } from 'react';
import classNames from 'classnames'
import RcSwitch, { SwitchChangeEventHandler } from 'rc-switch'
import styles from '@/components/Switch/Switch.module.scss'
import "rc-switch/assets/index.css"

export type SwitchProps = {
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
      className={classNames(styles['switch-input'], styles[`switch-input--${type}`], className)}
    >
      {title && <div className={styles["switch-input__label"]}>{title}</div>}
      <RcSwitch
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