import React from 'react';

import Logo from '../common/components/Logo';

import styles from './Header.styl';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <h1 className={styles.title}>#freethenipple</h1>
      </div>
      <div className={styles.subtitle}>
        Here you can replace the "forbidden" female nipples in your photos with
        the permitted male ones to use in your Instagram/Facebook/etc account.
        <hr />
        It's safe. We do not send your images anywhere. You can check our open
        source code on our{' '}
        <a
          href="http://github.com/freethenipple/freethenipple"
          className={styles.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github account{' '}
        </a>
      </div>
    </div>
  );
};

export default Header;
