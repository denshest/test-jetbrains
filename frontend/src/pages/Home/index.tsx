import React from 'react';
import { Redirect } from 'react-router-dom';
import { useTocData } from '@/contexts/TocDataContext';

const Home: React.FC = (): JSX.Element => {
  const tocData = useTocData();

  return (
    <Redirect to={{ pathname: tocData.data?.topLevelIds[0] }}/>
  );
};

export default Home;
