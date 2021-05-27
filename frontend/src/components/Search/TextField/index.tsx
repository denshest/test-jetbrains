import React, { forwardRef } from 'react';
import styles from './SearchTextField.module.scss';
import ResetIcon from '@/public/images/icons/reset.svg';

type SearchTextFieldPropsType = {
  value: string;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset : () => void;
};

const SearchTextField = forwardRef<HTMLInputElement, SearchTextFieldPropsType>(({ value, reset, onChange }, ref) => {
  return (
    <div className={styles.wrapper}>
      <input
        type='text'
        placeholder='Type something to search'
        className={styles.input}
        ref={ref}
        onChange={onChange}
        value={value}
      />
      { value && (
        <button type='button' id='search-reset-icon' className={styles.reset} onClick={reset}>
          <ResetIcon width={24} height={24} className={styles.reset__icon} />
        </button>
      ) }
    </div>
  );
});

SearchTextField.displayName = 'SearchTextField';

export default SearchTextField;
