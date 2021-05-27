import React, { Dispatch, FC, useEffect, useState } from 'react';
import styles from './SearchResults.module.scss';
import LoaderIcon from '@/public/images/icons/loader.svg';
import { Link } from 'react-router-dom';
import { ITocPage } from '@/types/toc';
import useQuery from '@/lib/query';
import { useTocData } from '@/contexts/TocDataContext';

type SearchResultsPropsType = {
  value: string;
  isSearching: boolean;
  setIsSearching: Dispatch<React.SetStateAction<boolean>>;
};

const SearchResults: FC<SearchResultsPropsType> = ({ value, isSearching, setIsSearching }) => {
  const query = useQuery();
  const { data, getPagesBySearchText } = useTocData();
  
  const [results, setResults] = useState<ITocPage[]>([]);
  
  useEffect(() => {
    if (value) {
      const timeoutId = setTimeout(() => {
        query.set('search', value);
        history.pushState(null, '', '?' + query.toString());

        if (data) {
          setIsSearching(true);
          getPagesBySearchText(value)
            .then(result => setResults(result))
            .finally(() => setIsSearching(false))
          ;
        }
      }, 500);
    
      return () => clearTimeout(timeoutId);
    }
  }, [value, data]);
  
  return (
    <div className={styles.wrapper}>
      { isSearching ? (
        <LoaderIcon width={40} height={40} className={styles.loader} />
      ) : (
        <>
          { results.length > 0 ? (
            <>
              <div className={styles.header}>
                Showing results for «<span className={styles.modal__header_value}>{ value }</span>»
              </div>
              <ul className={styles.list}>
                { results.map(page => (
                  <li key={page.id} className={styles.item}>
                    <Link to={`/${page.id}`} className={styles.link} dangerouslySetInnerHTML={{ __html: page.title }}/>
                  </li>
                )) }
              </ul>
            </>
          ) : (
            <div className={styles['no-results']}>
              We’re sorry! We couldn’t find results for «{value}»
            </div>
          ) }
        </>
      ) }
    </div>
  );

};

export default SearchResults;
