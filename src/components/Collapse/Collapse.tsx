import React, { Fragment } from 'react';
import RcCollapse, { CollapseProps as rcCollapseProps, Panel as RcPanel, CollapsePanelProps as RcPanelProps } from 'rc-collapse';
import csx from 'classnames'
import motionUtil from './motionUtil';
import { Radio, RadioGroup, GroupProps } from '@/components/Radio/Radio';
import { RxChevronUp, RxChevronDown } from 'react-icons/rx'
import styles from '@/components/Collapse/Collapse.module.scss'

export interface CollapseProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (key: React.Key | React.Key[]) => void;
  type?: 'arrow' | 'radio';
  value?: string;
  level?: number;
  noPadding?: boolean;
  activeKey?: React.Key | React.Key[];
}

interface CloneElementProps {
  type?: 'arrow' | 'radio';
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  className,
  onChange,
  type,
  value,
  level = 0,
  noPadding,
  ...rest
}) => {
  const Wrapper = type === 'radio' ? RadioGroup : Fragment;
  const wrapperProps: GroupProps = {};

  if (type === 'radio') {
    wrapperProps.onChange = onChange;
    wrapperProps.value = value;
  }

  const expandIcon: React.FC<RcPanelProps> = ({ isActive }) => {
    return <Fragment>
      {isActive ? <RxChevronUp /> : <RxChevronDown />}
    </Fragment>
  }

  const rcCollapseProps: rcCollapseProps = {
    accordion: true,
    openMotion: motionUtil,
    className: csx(styles['collapse'], className, ` collapse collapse--${type} collapse--level-${level}`),
    ...rest,
  };

  if (type !== 'radio') {
    rcCollapseProps.onChange = onChange;
  }

  if (type === 'arrow') {
    rcCollapseProps.expandIcon = expandIcon
  }

  return (
    <div className={styles['collapse-container']}>
      {title && <h1 className={csx(styles['collapse__title'])}>{title}</h1>}
      <Wrapper {...wrapperProps}>
        <RcCollapse {...rcCollapseProps}>
          {children &&
            React.Children.map(children, (child, index) => (
              <Fragment key={index}>
                {React.isValidElement(child) &&
                  React.cloneElement(child, { type } as CloneElementProps)}
              </Fragment>
            ))}
        </RcCollapse>
      </Wrapper>
    </div>
  );
};

interface PanelProps extends React.PropsWithChildren {
  showArrow?: boolean;
  className?: string;
  type?: 'arrow' | 'radio';
  value?: string;
  header?: string
}

const Panel: React.FC<PanelProps> = ({
  showArrow = false,
  className,
  type,
  value,
  header,
  ...rest
}) => (
  <RcPanel
    header={
      <div className='collapse__header'>
        {type === 'radio' ? (
          <Radio size="large" label={header} value={value} />
        ) : (
          header
        )}
      </div>
    }
    showArrow={type === 'arrow' || showArrow}
    className={className}
    {...rest}
  />
);

export { Collapse, Panel };