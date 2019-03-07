import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import logo from './img/cleeng-logo-sm.png';
import security from './img/security.svg';

const Footer = ({ className }) => (
  <div className={cx(s.footer, className)}>
    <span className={s.productBy}>
      Powered by
      <a href="https://cleeng.com" rel="noopener noreferrer" target="_blank">
        <img src={logo} alt="Powered by Cleeng" />
      </a>
    </span>
    <div className={s.security}>
      <img src={security} alt="secured" />
      Secured checkout
    </div>
  </div>
);

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default withStyles(s)(Footer);
