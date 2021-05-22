import React  from 'react';
import NotFound from '@/pages/NotFound';

type ArticlePropsType = {
  page: any;
};

const Article: React.FC<ArticlePropsType> = ({ page }): JSX.Element => {
  if (!page) return <NotFound/>;

  return (
    <div>
      <h1>
        { page.title }
      </h1>
    </div>
  );
};

export default Article;
