import React from 'react';
import styles from './SidebarPlaceholder.module.scss';

const LoadingPlaceholder: React.FC = (): JSX.Element => (
  <>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
    <li className={styles.container}/>
  </>
);

export default LoadingPlaceholder;
