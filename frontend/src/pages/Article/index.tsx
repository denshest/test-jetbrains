import React, { FC } from 'react';
import { useTocData } from '@/contexts/TocDataContext';
import { useLocation, useParams } from 'react-router-dom';
import DefaultLayoutWithSidebar from '@/layouts/DefaultWithSidebar';
import NotFound from '@/pages/NotFound';
import styles from './Article.module.scss';

const Article: FC = (): JSX.Element => {
  const { isLoading, getPageById, getAnchorByHash } = useTocData();
  const { id } = useParams<{ id: string }>();
  const { hash } = useLocation();

  const
    page = getPageById(id),
    anchor = hash && getAnchorByHash(hash)
  ;

  if (!isLoading && !page) return <NotFound/>;

  return (
    <DefaultLayoutWithSidebar>
      <article>
        <header className={styles.header}>
          <h1>
            {page?.title}
          </h1>
          { anchor && (
            <h2>
              { anchor.title }
            </h2>
          ) }
        </header>
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
      </article>
    </DefaultLayoutWithSidebar>
  );
};

export default Article;
