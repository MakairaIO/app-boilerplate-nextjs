import RcTable, { Column } from 'rc-table'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import styles from '@/components/Table/Table.module.scss'
import { Spinner } from '@/components'
import classNames from 'classnames'

type TableProps = React.PropsWithChildren<{
  pathname?: string
  data: object[]
  rowKey: string
  onRowClick?: Function
  showRightArrow?: boolean
  loading?: boolean
}>

const Table: React.FunctionComponent<TableProps> = ({
  data,
  rowKey,
  onRowClick = () => {},
  children,
  showRightArrow = false,
  loading
}) => {
  const className = classNames(styles.table, { 
    [styles.loading]: loading 
  })
  return (
    <div className={className}>
      {loading && <Spinner size='normal' className={styles.loadingSnipper}/>}
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
