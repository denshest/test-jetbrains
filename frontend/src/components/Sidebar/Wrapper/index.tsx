import React, { FC } from 'react';
import styles from './Sidebar.module.scss';
import Item from '@/components/Sidebar/Item';
import { useTocData } from '@/contexts/TocDataContext';
import LoadingPlaceholder from '@/components/Sidebar/Placeholder';

const Sidebar: FC = (): JSX.Element => {
  const { data, isLoading } = useTocData();

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        { 
          isLoading 
            ? <LoadingPlaceholder/> 
            : data && data.topLevelIds.map(id => (
              <Item key={data.entities.pages[id].id} id={data.entities.pages[id].id} />
            ))
        }
      </ul>
    </nav>
  );
};

export default Sidebar;
