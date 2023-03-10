import React, { Fragment, useId, useMemo, useState } from 'react'
import classNames from 'classnames'

import styles from '@/components/Tabs/Tabs.module.scss'

type TabsItem = {
  key: string;
  title: string;
  content: React.ReactNode | string;
}

type TabsProps = React.PropsWithChildren<{
  items: Array<TabsItem>
  defaultActiveKey: string;
  className?: string;
  onChange?: (key: string) => void
}>

const Tabs: React.FC<TabsProps> = ({
  items,
  className,
  defaultActiveKey,
  onChange = (key: string) => {}
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const [renderedKeys, setRenderedKeys] = useState([defaultActiveKey]);

  const randomKey = useId()
  const getTabId = (key: string) => `tab-tabindex-${randomKey}-${key}`
  const getTabContentId = (key: string) => `tab-panel-${randomKey}-${key}`

  const onChangeTab = (key: string) => {
    if (!renderedKeys.includes(key)) {
      setRenderedKeys([...renderedKeys, key])
    }
    setActiveKey(key)
    onChange(key)
  }

  return (
    <div className={classNames('tabs', className)}>
      <div className={styles.tabList} role="tablist">
        {
          items.map(item => {
            const isActive = activeKey === item.key
            const tabItemClass = classNames(styles.tabItem, {
              [styles.active]: isActive
            })

            return (
              <div
                role="tab"
                aria-selected={isActive}
                aria-controls={getTabContentId(item.key)}
                id={getTabId(item.key)}
                className={tabItemClass}
                key={`tab-${item.key}`}
                onClick={onChangeTab.bind(this, item.key)}
              >
                {item.title}
              </div>
            )
          })
        }
      </div>
      <div className={styles.tabPanels} >
        {
          items.map(item => {
            const isActive = activeKey === item.key
            const shouldRender = renderedKeys.includes(item.key)

            const panel = useMemo(() => {
              if (!shouldRender) return null

              let additionProps: any = {}
              let content: React.ReactNode = null

              if (React.isValidElement(item.content)) {
                content = item.content
              } else {
                additionProps.dangerouslySetInnerHTML = {
                  __html: item.content
                }
              }
              return (
                <div
                  role="tabpanel"
                  id={getTabContentId(item.key)}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                  aria-labelledby={getTabId(item.key)}
                  className={classNames(styles.panel, { [styles.active]: isActive })}
                  {...additionProps}
                  key={`panel-${item.key}`}
                >
                  {content}
                </div>
              )
            }, [item, shouldRender, isActive])

            return panel
          })
        }
      </div>
    </div>
  )
}

export {
  Tabs
}