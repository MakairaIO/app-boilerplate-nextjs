import RcTable, { Column, TableProps as TableRcProps } from 'rc-table'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import styles from '@/components/Table/Table.module.scss'
import { PaginationProps, Spinner } from '@/components'
import classNames from 'classnames'
import Pagination from '../Pagination/Pagination'

type DefaultRecordType = Record<string, any>
type ColumnType = TableRcProps<DefaultRecordType>['columns']

type TableProps = React.PropsWithChildren<{
  pathname?: string
  data: object[]
  rowKey: string
  onRowClick?: Function
  showRightArrow?: boolean
  loading?: boolean
  columns?: ColumnType
  pagination?: PaginationProps,
  alternateRowBackground?: Boolean
}>

const Table: React.FunctionComponent<TableProps> = ({
  data,
  rowKey,
  onRowClick = () => {},
  children,
  showRightArrow = false,
  loading,
  columns,
  pagination,
  alternateRowBackground = false
}) => {
  const className = classNames(styles.table, { 
    [styles.loading]: loading,
    [styles.alternateBackground] : alternateRowBackground
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
        columns={columns}
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
      {pagination && <Pagination {...pagination} className={styles.pagination}/>}
    </div>
  )
}

export { Table, Column }