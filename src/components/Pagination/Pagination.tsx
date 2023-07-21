import { useEffect, useState } from 'react'
import csx from 'classnames'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import styles from '@/components/Pagination/Pagination.module.scss'
import classNames from 'classnames'

export type PaginationProps = {
  initialCurrentPage?: number;
  currentPage?: number;
  maxPage: number;
  onPageSwitch: Function;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {

  const [currentPage, setCurrentPage] = useState(props.initialCurrentPage ?? 1)

  const { maxPage = 1, onPageSwitch = () => {} } = props

  useEffect(() => {
    if (props.currentPage !== undefined) setCurrentPage(props.currentPage)
  }, [props.currentPage])

  const finalMaxPage = maxPage < 1 ? 1 : maxPage

  const handlePageSwitch = (page: number) => {
    let finalPage = page

    if (page > finalMaxPage) {
      finalPage = finalMaxPage
    } else if (page < 1) {
      finalPage = 1
    }

    if (finalPage === currentPage) return

    onPageSwitch(finalPage)
    setCurrentPage(finalPage)
  }

  const pages = []

  let startPage = 2
  let endPage = finalMaxPage - 1

  if (finalMaxPage > 9) {
    if (currentPage < 5) {
      endPage = 6
    } else {
      endPage = currentPage + 2
      startPage = currentPage - 2

      if (currentPage > finalMaxPage - 4) {
        endPage = finalMaxPage - 1
      }

      if (currentPage > finalMaxPage - 3) {
        startPage = finalMaxPage - 5
      }
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        className={csx(styles.page, {
          [styles.active]: i === currentPage,
        })}
        key={i}
        onClick={() => handlePageSwitch(i)}
      >
        {i}
      </button>
    )
  }

  return (
    <div className={classNames(styles.pagination, props.className)}>
      <button
        className={csx(styles['nav-button'], {
          [styles.disabled]: 1 === currentPage,
        })}
        onClick={() => handlePageSwitch(currentPage - 1)}
      >
        <SlArrowLeft className={styles.icon}/>
      </button>
      <div className={styles.pages}>
        <button
          className={csx(styles.page, {
            [styles.active]: 1 === currentPage,
          })}
          onClick={() => handlePageSwitch(1)}
        >
          1
        </button>
        {currentPage > 4 && finalMaxPage > 9 && (
          <span className={styles.dots}>…</span>
        )}
        {pages}
        {currentPage < finalMaxPage - 3 && finalMaxPage > 9 && (
          <span className={styles.dots}>…</span>
        )}
        {finalMaxPage > 1 && (
          <button
            className={csx(styles.page, {
              [styles.active]: finalMaxPage === currentPage,
            })}
            onClick={() => handlePageSwitch(finalMaxPage)}
          >
            {finalMaxPage}
          </button>
        )}
      </div>
      <button
        className={csx(styles['nav-button'], {
          [styles.disabled]: maxPage === currentPage,
        })}
        onClick={() => handlePageSwitch(currentPage + 1)}
      >
        <SlArrowRight className={styles.icon}/>
      </button>
    </div>
  )
}

export { Pagination }
export default Pagination