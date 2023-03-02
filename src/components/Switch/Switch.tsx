import { cloneElement, FC } from 'react';
import classNames from 'classnames'
import RcSwitch, { SwitchChangeEventHandler, SwitchClickEventHandler } from 'rc-switch'
import styles from '@/components/Switch/Switch.module.scss'
import "rc-switch/assets/index.css"

export type SwitchProps = {
  title?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: SwitchChangeEventHandler;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onClick?: SwitchClickEventHandler;
  tabIndex?: number;
  /**
   * Default: vertical
   */
  type?: 'vertical' | 'horizontal',
  className?: string;
  labelClassName?: string;
  loading?: boolean;
  loadingIcon?: React.ReactElement;
  style?: React.CSSProperties;
  size?: 'small' | 'large';
}

const Switch: FC<SwitchProps> = ({
  title,
  defaultChecked,
  checked,
  disabled,
  checkedChildren,
  unCheckedChildren,
  onChange,
  onKeyDown,
  onClick,
  tabIndex,
  type = 'vertical',
  className,
  labelClassName,
  loadingIcon,
  style,
  size = 'large',
  loading = false,
}) => {

  let LoadingIcon = null;
  if (loading && loadingIcon) {
    LoadingIcon = cloneElement(loadingIcon, { className: 'switch--loading' })
  }
  
  return (
    <div
      className={classNames(styles['switch-input'], styles[`switch-input--${type}`], styles[size], className)}
    >
      {title && <div className={classNames(styles["switch-input__label"], labelClassName)}>{title}</div>}
      <RcSwitch
        title={title}
        checked={checked}
        defaultChecked={defaultChecked}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
        tabIndex={tabIndex}
        disabled={disabled || loading}
        style={style}
        loadingIcon={LoadingIcon}
      />
    </div>
  )
}

export {
  Switch,
}