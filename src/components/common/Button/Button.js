import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-unused-class */
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

const Button = ({ children, onClickFn, color, className, type }) => (
  <button
    className={cx(
      s.button,
      { [s[`button-variant-${color}`]]: color },
      className,
    )}
    type={type}
    onClick={onClickFn}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClickFn: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  color: '',
  onClickFn: () => {},
  children: '',
  type: 'button',
};

export default withStyles(s)(Button);
