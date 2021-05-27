import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '@/public/images/icons/search.svg';
import useQuery from '@/lib/query';
import { useLocation } from 'react-router-dom';
import SearchResults from '@/components/Search/Results';
import SearchTextField from '@/components/Search/TextField';

const Search: FC = (): JSX.Element => {
  const query = useQuery();
  const location = useLocation();

  const [showInput, setShowInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchInput = useRef<HTMLInputElement | null>(null);
  const searchInputWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue('');
    setShowInput(false);
  }, [location.pathname]);

  useEffect(() => {
    const searchQuery = query.get('search');

    if (searchQuery) {
      setIsSearching(true);
      setValue(searchQuery);
      setShowInput(true);
    }
  }, []);

  useEffect(() => {
    if (showInput) {
      window.addEventListener('click', handleWindowClick);
      searchInput.current?.focus();
    }

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [showInput]);

  const handleWindowClick = (e: Event) => {
    const { current } = searchInputWrapper;
    const target = e.target as HTMLElement;

    if (current && current !== target && !current.contains(target) && target.id !== 'search-reset-icon') {
      setShowInput(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setValue(e.target.value);
  };

  const clearSearchInput = () => {
    searchInput.current?.focus();
    setValue('');
    query.delete('search');
    history.pushState(null, '', query.toString() ? '?' + query.toString() : location.pathname);
  };

  return (
    <>
      { showInput ? (
        <div className={styles.wrapper} ref={searchInputWrapper}>
          <SearchTextField ref={searchInput} value={value} onChange={(e) => onChange(e)} reset={clearSearchInput} />

          { value && <SearchResults value={value} isSearching={isSearching} setIsSearching={setIsSearching}/> }
        </div>
      ) : (
        <button type='button' className={styles.button} onClick={() => setShowInput(true)}>
          <SearchIcon width={24} height={24} className={styles.button__icon}/>
        </button>
      )}
    </>
  );
};

export default Search;
