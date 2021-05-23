import React from 'react';
import styles from './Sidebar.module.scss';
import Item from '@/components/Item';

type SidebarPropsType = {
  data: ITocData;
}

const Sidebar: React.FC<SidebarPropsType> = ({ data }): JSX.Element => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        { data && data.topLevelIds.map(id => (
          <Item key={data.entities.pages[id].id} id={data.entities.pages[id].id} data={data}/>
        )) }
      </ul>
    </nav>
  );
};

export default Sidebar;
