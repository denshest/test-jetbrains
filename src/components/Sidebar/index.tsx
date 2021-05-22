import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.scss';
import Item from '@/components/Item';

type SidebarPropsType = {
  data: any;
}

const Sidebar: React.FC<SidebarPropsType> = ({ data }): JSX.Element => {
  const [pages, setPages] = useState<any>(null);
  const [anchors, setAnchors] = useState<any>(null);

  useEffect(() => {
    setPages(Object.values(data.entities.pages))
    setAnchors(Object.values(data.entities.anchors))
  }, []);

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        { pages && (pages.filter(item => Object.values(data.topLevelIds).includes(item.id))).map(item => (
          <Item key={item.id} id={item.id} pages={pages} anchors={anchors}/>
        )) }
      </ul>
    </nav>
  );
}

export default Sidebar;
