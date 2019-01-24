import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Header.css';
import logo from './img/cleeng_logo_white.svg';

const Header = () => (
  <div className={s.header}>
    <div className={s.logo}>
      <img src={logo} alt="logo" />
    </div>
  </div>
);

export default withStyles(s)(Header);
