import React, { useEffect, useRef, useState } from 'react';
import styles from './SidebarItem.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@/public/images/icons/arrow.svg';
import { Link, useParams } from 'react-router-dom';
import { useTocData } from '@/contexts/TocDataContext';

type ItemPropsType = {
  id: string;
}

const Item: React.FC<ItemPropsType> = ({ id }): JSX.Element => {
  const { getPageById, getAnchorById, getPageParentsIds } = useTocData();
  const params = useParams<{ id: string }>();
  const itemRef = useRef<HTMLLIElement | null>(null);

  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);


  const item = getPageById(id);
  let parentsId: string[] = [];

  useEffect(() => {
    parentsId = getPageParentsIds(params.id);
    setShow((parentsId.includes(id) ? true : show));

    const isCurrent = id === params.id;
    isCurrent && setShow(true);
    setActive(isCurrent);

    setTimeout(() => itemRef.current?.scrollIntoView({ block: 'nearest',  behavior: 'smooth' }), 0);
  }, [params.id, id]);

  const toggleBranch = (e?: React.MouseEvent<SVGElement>) => {
    e && e.preventDefault();
    setShow(!show);
  };

  return (
    <>
      {item && (
        <>
          <li ref={active ? itemRef : undefined} className={clsx(styles.container, (active && item.anchors && item.anchors.length) && styles.container_active)}>
            <Link to={item.id} className={clsx(styles.link, active && styles.link_active)} style={{ paddingLeft: `${item.level * 16}px` }} onClick={() => toggleBranch()}>
              { item.pages && <ArrowIcon width={16} height={16} className={clsx(styles.arrow, show && styles.arrow_active)} onClick={(e: React.MouseEvent<SVGElement>) => toggleBranch(e)} /> }
              { item.title }
            </Link>

            { active && item.anchors && item.anchors.length > 0 &&
              <ul className={styles.sublist}>
                { item.anchors.map(id =>
                  <li key={id}>
                    <Link to={{ pathname: item.id, hash: getAnchorById(id)?.anchor }} className={styles.link} style={{ paddingLeft: `${item.level * 16}px` }}>
                      { getAnchorById(id)?.title }
                    </Link>
                  </li>
                ) }
              </ul>
            }
          </li>

          { show && item.pages?.map(id => <Item key={id} id={id} />) }
        </>
      )}
    </>
  );
};

export default Item;
