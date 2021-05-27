import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useTocData } from '@/contexts/TocDataContext';

const Home: FC = (): JSX.Element => {
  const { data } = useTocData();

  return (
    <Redirect to={{ pathname: data?.topLevelIds[0] }}/>
  );
};

export default Home;
