import classNames from "classnames";
import React, { FC, useMemo } from "react";
import { TabsItem } from "./Tabs";

import styles from '@/components/Tabs/Tabs.module.scss'

interface TabContentProps {
  item: TabsItem
  activeKey: string,
  renderedKeys: string[],
  getTabContentId: (key: string) => string
  getTabId: (key: string) => string
}

export const TabContent: FC<TabContentProps> = (props) => {
  const {
    activeKey,
    item,
    renderedKeys,
    getTabContentId,
    getTabId
  } = props
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
}