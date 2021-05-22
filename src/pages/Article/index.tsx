import React from 'react';
import { useParams } from 'react-router-dom';

const Article: React.FC = (): JSX.Element => {
  let { id } = useParams();

  return (
    <div>
      Page ID: { id }
    </div>
  );
}

export default Article;
