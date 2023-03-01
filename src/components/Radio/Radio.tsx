import React, { useContext, FC } from 'react';
import csx from 'classnames'
import styles from '@/components/Radio/Radio.module.scss'

type RadioProps = {
  label?: string;
  value?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  direction?: 'horizontal' | 'vertical';
  labelClickable?: boolean;
  wrapperClassName?: string;
  [key: string]: any;
};

type LabelProps = {
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  direction?: 'horizontal' | 'vertical';
  selectedValue?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  wrapperClassName?: string;
  [key: string]: any;
};

export type GroupProps = {
  onChange?: (value: string) => void;
  value?: string;
  children?: React.ReactNode;
};

const RadioContext = React.createContext<{
  onChange?: (value: string) => void;
  value?: string;
}>({ onChange: () => {} });

const Radio: FC<RadioProps> = ({
  label,
  value,
  disabled,
  size = 'medium',
  direction = 'horizontal',
  labelClickable = true,
  wrapperClassName = '',
  ...rest
}) => {
  const { value: selectedValue, onChange = () => {} } = useContext(
    RadioContext
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    onChange(e.target.value);
  };

  if (labelClickable) {
    return (
      <Label
        disabled={disabled}
        size={size}
        direction={direction}
        selectedValue={selectedValue}
        value={value}
        handleChange={handleChange}
        label={label}
        wrapperClassName={wrapperClassName}
        {...rest}
      />
    );
  }

  return (
    <div
      className={csx(styles['radio-button__label-not-clickable'],  wrapperClassName)}
    >
      <Label
        label={''} 
        disabled={disabled}
        size={size}
        direction={direction}
        selectedValue={selectedValue}
        value={value}
        handleChange={handleChange}
        {...rest}      />
      {label}
    </div>
  );
};

const Label: FC<LabelProps> = ({
  disabled,
  size,
  direction,
  selectedValue,
  value,
  handleChange,
  label,
  wrapperClassName,
  ...rest
}) => {

  return (
    <label
      className={csx(styles['radio-button'], styles['radio-button'], styles[`radio-button--${size}`], {[styles[`radio-button--${direction}`]]: disabled},  wrapperClassName)}
      {...rest}
    >
      <input
        type="radio"
        disabled={disabled}
        checked={selectedValue ? selectedValue === value : undefined}
        value={value}
        onChange={handleChange}
      />
      <span className={csx(styles['radio-button__checkmark'])} />
      {label}
    </label>
  );
};

const RadioGroup: FC<GroupProps> = ({ onChange, value, children }) => {
  return (
    <RadioContext.Provider value={{ onChange, value }}>
      {children}
    </RadioContext.Provider>
  );
};

export { Radio, RadioGroup };