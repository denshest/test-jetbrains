import React, {useEffect, useState} from 'react';
import styles from './Item.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@/public/images/icons/arrow.svg';
import { Link } from "react-router-dom";

type ItemPropsType = {
  id: string;
  pages: any[];
  anchors: any[];
}

const Item: React.FC<ItemPropsType> = ({ id, pages, anchors }): JSX.Element => {
  const [item, setItem] = useState(null);
  const [active, setActive] = useState(false);
  const [childPages, setChildPages] = useState<any>([]);
  const [childAnchors, setChildAnchors] = useState<any>([]);

  useEffect(() => {
    setItem(pages.find(item => item.id === id));
    setChildPages(pages.filter(item => item.parentId === id));
    setChildAnchors(anchors.filter(item => item.parentId === id));
  }, [id]);

  return (
    <>
      {item && (
        <>
          <li onClick={() => (childPages.length || childAnchors.length) && setActive(!active)} className={clsx(styles.container, (active && childAnchors.length > 0) ? styles.container_active : '')}>
            <Link to={item.id} className={styles.link} style={{paddingLeft: `${item.level * 16}px`}}>
              { childPages.length > 0 && (
                <ArrowIcon width={16} height={16} className={clsx(styles.arrow, active && styles.arrow_active)} />
              ) } { item.title }
            </Link>
            { active && childAnchors.length > 0 && (
              <ul className={styles.sublist}>
                { childAnchors.map(anchor => (
                  <li key={anchor.id}>
                    <Link to={anchor.id} className={styles.link} style={{paddingLeft: `${item.level * 16}px`}}>
                      { anchor.title }
                    </Link>
                  </li>
                )) }
              </ul>
            ) }
          </li>

          { active && childPages.map(child => (
            <Item key={child.id} id={child.id} pages={pages} anchors={anchors} />
          )) }
        </>
      )}
    </>
  );
}

export default Item;
