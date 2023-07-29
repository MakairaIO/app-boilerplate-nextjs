import RcTable, { Column, TableProps as TableRcProps } from 'rc-table'
import type { GetRowKey } from 'rc-table/lib/interface';
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

import styles from '@/components/Table/Table.module.scss'
import { PaginationProps, Spinner } from '@/components'
import classNames from 'classnames'
import Pagination from '../Pagination/Pagination'

type DefaultRecordType = Record<string, any>

interface TableProps extends TableRcProps<DefaultRecordType> {
  pathname?: string
  data: object[]
  onRowClick?: Function
  showRightArrow?: boolean
  loading?: boolean
  pagination?: PaginationProps,
  alternateRowBackground?: Boolean
} 

const Table: React.FunctionComponent<TableProps> = ({
  data,
  onRowClick = () => {},
  children,
  showRightArrow = false,
  loading,
  columns,
  pagination,
  alternateRowBackground = false,
  className
}) => {
  const _className = classNames(styles.table, className, { 
    [styles.loading]: loading,
    [styles.alternateBackground] : alternateRowBackground,
  })

  return (
    <div className={_className}>
      {loading && <Spinner size='normal' className={styles.loadingSnipper}/>}
      <RcTable
        data={data}
        rowKey={(_, idx): React.Key => idx as React.Key}
        prefixCls="makaira-table"
        onRow={(record, index) => {
          return {
            onClick: (e) => onRowClick(record, index, e.target)
          } 
        }}
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