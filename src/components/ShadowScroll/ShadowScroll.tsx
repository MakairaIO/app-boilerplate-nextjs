import csx from 'classnames'
import { useState, useEffect, useRef, ReactNode, FunctionComponent } from 'react'
import styles from '@/components/ShadowScroll/ShadowScroll.module.scss'

type TDirection = 'vertical' | 'horizontal';

type TDirectionProps = {
  scrollSize: 'scrollHeight' | 'scrollWidth';
  clientSize: 'clientHeight' | 'clientWidth';
  offsetSize: 'offsetHeight' | 'offsetWidth';
  scrollTop: 'scrollTop' | 'scrollLeft';
}

const DIRECTIONS: Record<TDirection, TDirectionProps> = {
  vertical: {
    scrollSize: 'scrollHeight',
    clientSize: 'clientHeight',
    scrollTop: 'scrollTop',
    offsetSize: 'offsetHeight',
  },
  horizontal: {
    scrollSize: 'scrollWidth',
    clientSize: 'clientWidth',
    scrollTop: 'scrollLeft',
    offsetSize: 'offsetWidth',
  },
}

type ShadowScrollProps = React.PropsWithChildren<{
  children?: ReactNode
  className?: string
  direction?: 'vertical' | 'horizontal'
  maxWidth?: string
  maxHeight?: string
}>

const ShadowScroll: FunctionComponent<ShadowScrollProps> = ({
  children,
  className,
  direction = 'vertical',
  maxWidth,
  maxHeight,
  ...rest
}) => {

  const contentRef = useRef<HTMLDivElement>(null)
  const dir = DIRECTIONS[direction]
  const [contentHasScroll, setContentHasScroll] = useState(false)
  const [contentScrollPosition, setContentScrollPosition] = useState('top') // top, middle, bottom

  const handleScroll = (e: Event) => {
    const element = e.target as HTMLElement
    initScrollElement(element)
  }

  const initScrollElement = (element: HTMLElement) => {
    const hasScrollbar = element && element[dir.scrollSize] > element[dir.clientSize];
    setContentHasScroll(hasScrollbar)

    if (element[dir.scrollTop] === 0) {
      setContentScrollPosition('top')
      return
    }

    const bottomReached =
      element[dir.scrollTop] + 5 >=
      element[dir.scrollSize] - element[dir.offsetSize];

    if (bottomReached) {
      setContentScrollPosition('bottom')
      return
    }

    setContentScrollPosition('middle')
  }

  useEffect(() => {
    if (!contentRef?.current) return

    const content = contentRef.current
    initScrollElement(content)
    content.addEventListener('scroll', handleScroll)

    return () => {
      content && content.removeEventListener('scroll', handleScroll)
      setContentHasScroll(false)
      setContentScrollPosition('top')
    }
  }, [children])

  const classes = {
    'shadow-scroll--has-scroll': contentHasScroll,
    'shadow-scroll--top': contentHasScroll && contentScrollPosition === 'top',
    'shadow-scroll--bottom':
      contentHasScroll && contentScrollPosition === 'bottom',
  }

  return (
    <div className={styles.wrapper}>
      <div
        style={{ maxWidth, maxHeight }}
        className={csx(
          'shadow-scroll',
          `shadow-scroll--${direction}`,
          classes
        )}
        {...rest}
      >
        <div className="shadow-scroll__top" />
        <div
          className={csx(className, 'shadow-scroll__body')}
          ref={contentRef}
        >
          {children}
        </div>
        <div className="shadow-scroll__bottom" />
      </div>
    </div>
  )
}

export { ShadowScroll }
