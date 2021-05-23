import React, { useEffect, useState } from 'react';
import styles from './Item.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@/public/images/icons/arrow.svg';
import { Link, useLocation } from 'react-router-dom';

type ItemPropsType = {
  id: string;
  data: ITocData;
}

const Item: React.FC<ItemPropsType> = ({ data, id }): JSX.Element => {
  const [item, setItem] = useState<ITocPage | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const
    location = useLocation(),
    { pathname } = location,
    routerId = pathname.split('/')[1]
  ;

  useEffect(() => {
    setItem(data.entities.pages[id]);
    console.log(routerId);
  }, [id]);

  return (
    <>
      {item && (
        <>
          <li className={clsx(styles.container, (active && item?.anchors) ? styles.container_active : '')}>
            <Link to={item.id} className={styles.link} style={{ paddingLeft: `${item.level * 16}px` }} onClick={() => (item.pages || item.anchors) && setActive(!active)}>
              { item.pages && (
                <ArrowIcon width={16} height={16} className={clsx(styles.arrow, active && styles.arrow_active)} />
              ) } { item.title }
            </Link>
            { active && item.anchors && (
              <ul className={styles.sublist}>
                { item.anchors.map(id => (
                  <li key={id}>
                    <Link to={id} className={styles.link} style={{ paddingLeft: `${item.level * 16}px` }}>
                      { data.entities.anchors[id].title }
                    </Link>
                  </li>
                )) }
              </ul>
            ) }
          </li>

          {
            active && item.pages?.map(id => (
              <Item key={id} id={id} data={data} />
            )) }
        </>
      )}
    </>
  );
};

export default Item;
