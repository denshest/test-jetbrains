import React, { FC } from 'react';
import Header from '@/components/Header';

const DefaultLayout: FC = ({ children }): JSX.Element => {
  return (
    <>
      <Header/>
      <main>
        { children }
      </main>
    </>
  );
};

export default DefaultLayout;
