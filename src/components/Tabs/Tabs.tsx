import React, { useId, useState } from 'react'
import classNames from 'classnames'
import styles from '@/components/Tabs/Tabs.module.scss'
import { TabContent } from './TabContent';

export type TabsItem = {
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
          items.map(item => (
            <TabContent
              item={item}
              activeKey={activeKey}
              getTabContentId={getTabContentId}
              getTabId={getTabId}
              renderedKeys={renderedKeys}
              key={item.key}
            />
          ))
        }
      </div>
    </div>
  )
}

export {
  Tabs
}