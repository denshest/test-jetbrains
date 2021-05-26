import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '@/layouts/Default';
import styles from './NotFound.module.scss';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <img src='/images/not-found.png' className={styles.image} />
        <Link to='/' className={styles.link}>
          Go to home
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default NotFound;
