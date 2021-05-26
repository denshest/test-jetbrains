import React, { useEffect, useState } from 'react';
import styles from './SidebarItem.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@/public/images/icons/arrow.svg';
import { Link } from 'react-router-dom';
import { useTocData } from '@/contexts/TocDataContext';
import { ITocPage } from '@/types/toc';

type ItemPropsType = {
  id: string;
}

const Item: React.FC<ItemPropsType> = ({ id }): JSX.Element => {
  const [item, setItem] = useState<ITocPage | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const { data } = useTocData();

  useEffect(() => {
    if (data && id) {
      setItem(data.entities.pages[id]);
    }
  }, [id, data]);

  return (
    <>
      {item && (
        <>
          <li className={clsx(styles.container, (active && item?.anchors) ? styles.container_active : '')}>
            <Link to={item.id} className={styles.link} style={{ paddingLeft: `${item.level * 16}px` }}>
              { item.pages && (
                <ArrowIcon width={16} height={16} className={clsx(styles.arrow, active && styles.arrow_active)} onClick={() => (item.pages || item.anchors) && setActive(!active)} />
              ) } { item.title }
            </Link>
            { active && item.anchors && (
              <ul className={styles.sublist}>
                { item.anchors.map(id => (
                  <li key={id}>
                    <Link to={{ pathname: item.id, hash: data?.entities.anchors[id].anchor }} className={styles.link} style={{ paddingLeft: `${item.level * 16}px` }}>
                      { data?.entities.anchors[id].title }
                    </Link>
                  </li>
                )) }
              </ul>
            ) }
          </li>

          {
            active && item.pages?.map(id => (
              <Item key={id} id={id} />
            )) }
        </>
      )}
    </>
  );
};

export default Item;
