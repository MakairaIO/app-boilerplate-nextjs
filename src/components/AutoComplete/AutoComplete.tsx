import React, { useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import {Select, SelectProps, SelectOption  } from '../Select/Select'
import styles from './AutoComplete.module.scss'

interface AutoCompleteProps extends SelectProps {
  onSearch?: (value: string) => Promise<SelectOption[]>;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options: defaultOptions, onSearch, ...rest }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<SelectOption[]>(defaultOptions || [])

  const handleDropdownVisibleChange = (visible:boolean) => {
    if (visible) {
      setTimeout(() => searchInputRef.current?.focus(), 200);
      if(searchInputRef.current?.value) {
        searchInputRef.current.value = '';
        setOptions(defaultOptions || [])
      }
    }
  }

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    let filteredOptions: SelectOption[] = defaultOptions || [];

    if(query) {
      if (typeof onSearch === 'function') {
        filteredOptions = await onSearch(query);
      } else if (defaultOptions) {
        filteredOptions = defaultOptions.filter((option) => {
            return (
              option.value
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              option.label
                .toLowerCase()
                .includes(query.toLowerCase())
            )
          
        })
      }
    }
    setOptions(filteredOptions)
  }


  return (
      <Select
        className={styles.autocomplete}
        allowClear={true}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        options={options}
        dropdownRender={(menu) => (
          <>
            <div className={styles.search}>
              <input ref={searchInputRef} onChange={handleSearchChange} />
              <FaSearch />
            </div>
            {menu}
          </>
        )}
        {...rest}
      />
  )
}

AutoComplete.displayName = 'AutoComplete'
export { AutoComplete }
