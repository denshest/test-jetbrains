import React, { useEffect, useRef, useState } from 'react';
import styles from './SidebarItem.module.scss';
import clsx from 'clsx';
import ArrowIcon from '@/public/images/icons/arrow.svg';
import { Link, useParams } from 'react-router-dom';
import { useTocData } from '@/contexts/TocDataContext';
import { ITocPage } from '@/types/toc';

type ItemPropsType = {
  id: string;
}

const Item: React.FC<ItemPropsType> = ({ id }): JSX.Element => {
  const { data } = useTocData();
  const params = useParams<{ id: string }>();

  const [item, setItem] = useState<ITocPage | null>(null);
  const [parentsId, setParentsId] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const itemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (data) {
      setItem(data.entities.pages[id]);
    }
    setTimeout(() => {
      itemRef.current?.scrollIntoView({ block: 'center',  behavior: 'smooth' });
    }, 0);
  }, [data]);

  useEffect(() => {
    setShow((parentsId.includes(id) ? true : show));
  }, [parentsId, id]);

  useEffect(() => {
    const isCurrent = item?.id === params.id;
    isCurrent && setShow(true);
    setActive(isCurrent);

    let page: ITocPage | undefined = data?.entities.pages[params.id];
    const array: string[] = [];

    while (page?.parentId) {
      const parent = getParentPage(page);
      parent?.id && array.push(parent.id);
      page = parent ? data?.entities.pages[parent.id] : undefined;
    }

    setParentsId(array);
  }, [params.id, item]);

  const toggleBranch = (e: React.MouseEvent<SVGElement> | undefined = undefined) => {
    e && e.preventDefault();
    setShow(!show);
  };
  
  const getParentPage = (page: ITocPage): ITocPage | undefined => {
    return data?.entities.pages[page.parentId];
  };

  return (
    <>
      {item && (
        <>
          <li className={clsx(styles.container, (active && item.anchors && item.anchors.length) ? styles.container_active : '')} ref={active ? itemRef : undefined}>
            <Link to={item.id} className={clsx(styles.link, active && styles.link_active)} style={{ paddingLeft: `${item.level * 16}px` }} onClick={() => toggleBranch()}>
              { item.pages && (
                <ArrowIcon width={16} height={16} className={clsx(styles.arrow, show && styles.arrow_active)} onClick={(e: React.MouseEvent<SVGElement>) => toggleBranch(e)} />
              ) } { item.title }
            </Link>

            { active && item.anchors && item.anchors.length > 0 && (
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
            show && item.pages?.map(id => (
              <Item key={id} id={id} />
            )) }
        </>
      )}
    </>
  );
};

export default Item;
