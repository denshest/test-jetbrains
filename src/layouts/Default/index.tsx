import React from 'react';
import Header from '@/components/Header';

const DefaultLayout: React.FC = ({ children }): JSX.Element => {
  return (
    <>
      <Header/>
      <main>
        { children }
      </main>
    </>
  );
}

export default DefaultLayout;
