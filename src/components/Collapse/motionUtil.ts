import { ReactNode } from 'react';
import type { CSSMotionProps, MotionEndEventHandler } from 'rc-motion';

const getCollapsedHeight = () => ({ height: 0, opacity: 0 })
const getRealHeight = (node: { scrollHeight: number; }) => ({ height: node.scrollHeight, opacity: 1 })
const getCurrentHeight = (node: { offsetHeight: number; }) => ({ height: node.offsetHeight })
// const skipOpacityTransition = (_: HTMLElement, event: { propertyName: string; }) => event.propertyName === 'height'

{/* @ts-ignore */}
const skipOpacityTransition = (_, event) => event.propertyName === 'height'


// export declare type MotionEndEventHandler = (element: HTMLElement, event: MotionEvent) => boolean | void;

const collapseMotion:CSSMotionProps = {
  motionName: 'rc-collapse-motion',
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: 'rc-collapse-content-hidden',
}

export default collapseMotion
