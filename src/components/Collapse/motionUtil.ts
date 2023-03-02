import type { CSSMotionProps, MotionEndEventHandler } from 'rc-motion';

const getCollapsedHeight = () => ({ height: 0, opacity: 0 })
const getRealHeight = (node: { scrollHeight: number; }) => ({ height: node.scrollHeight, opacity: 1 })
const getCurrentHeight = (node: { offsetHeight: number; }) => ({ height: node.offsetHeight })
// TODO: fix it
const skipOpacityTransition = (_: HTMLElement, event: MotionEndEventHandler) => event.propertyName === 'height'

const collapseMotion:CSSMotionProps = {
  motionName: 'rc-collapse-motion',
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  // TODO: fix it
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: 'rc-collapse-content-hidden',
}

export default collapseMotion