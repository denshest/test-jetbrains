import React from 'react';
import { useTocData } from '@/contexts/TocDataContext';
import { useLocation, useParams } from 'react-router-dom';
import DefaultLayoutWithSidebar from '@/layouts/DefaultWithSidebar';
import NotFound from '@/pages/NotFound';
import styles from './Article.module.scss';

const Article: React.FC = (): JSX.Element => {
  const { data, isLoading } = useTocData();
  const { id } = useParams<{ id: string }>();
  const { hash } = useLocation();

  const page = data?.entities.pages[id];
  const anchor = hash && data && Object.values(data?.entities.anchors).find(item => item.anchor === hash);

  if (!isLoading && !page) return <NotFound/>;

  return (
    <DefaultLayoutWithSidebar>
      <h1 className={styles.heading}>
        {page?.title}
      </h1>
      <div className={styles.content}>
        <div>
          <h3>
            Page:
          </h3>
          <pre>
            { JSON.stringify(page, undefined, 2) }
          </pre>
        </div>
        { anchor && (
          <div>
            <h3>
              Anchor:
            </h3>
            <pre>
              { JSON.stringify(anchor, undefined, 2) }
            </pre>
          </div>
        ) }
      </div>
    </DefaultLayoutWithSidebar>
  );
};

export default Article;
