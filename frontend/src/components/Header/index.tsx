import React, { FC } from 'react';
import styles from './Header.module.scss';
import Logo from '@/public/images/logo.svg';
import Search from '@/components/Search/Wrapper';

const Header: FC = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <a href='//jetbrains.com' target='_blank' className={styles.logo} title='JetBrains Official Website' rel="noreferrer">
        <Logo width={50} height={50} />
      </a>
      <Search/>
    </header>
  );
};

export default Header;
