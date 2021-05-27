import React, { FC } from 'react';
import DefaultLayout from '@/layouts/Default';
import Sidebar from '@/components/Sidebar/Wrapper';
import styles from './DefaultLayoutWithSidebar.module.scss';


const DefaultLayoutWithSidebar: FC = ({ children }): JSX.Element => {
  return (
    <DefaultLayout>
      <Sidebar/>
      <div className={styles.container}>
        { children }
      </div>
    </DefaultLayout>
  );
};

export default DefaultLayoutWithSidebar;
