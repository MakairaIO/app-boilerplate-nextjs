import RcTable, { Column } from 'rc-table'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import styles from '@/components/Table/Table.module.scss'

type TableProps = React.PropsWithChildren<{
  pathname?: string
  data: object[]
  rowKey: string
  onRowClick?: Function
  showRightArrow?: boolean
}>

const Table: React.FunctionComponent<TableProps> = ({
  data,
  rowKey,
  onRowClick = () => {},
  children,
  showRightArrow = false,
}) => {
  return (
    <div className={styles.table}>
      <RcTable
        data={data}
        rowKey={rowKey}
        prefixCls="makaira-table"
        onRow={(record, index) => ({
          onClick: () => onRowClick(record, index),
        })}
      >
        {children}

        {showRightArrow && (
          <Column
            width={50}
            render={() => (
              <div className={styles.rightArrow}>
                <FaAngleRight />
              </div>
            )}
          />
        )}
      </RcTable>
    </div>
  )
}

export { Table, Column }
