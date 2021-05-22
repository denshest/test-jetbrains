import React  from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

type ArticlePropsType = {
  page: any;
};

const Article: React.FC<ArticlePropsType> = ({ page }): JSX.Element => {
  const { id } = useParams<{id: string}>();

  if (!page) return <NotFound/>;

  return (
    <div>
      Page ID: { id }
    </div>
  );
};

export default Article;
