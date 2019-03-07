import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-unused-class */
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

<<<<<<< HEAD
const Button = ({ children, onClickFn, color, className, type }) => (
  <button
    className={cx(
      s.button,
      { [s[`button-variant-${color}`]]: color },
      className,
=======
const socialButtons = ['google', 'fb'];
const Button = ({ children, onClickFn, variant, className, type }) => (
  <button
    className={cx(
      s.button,
      { [s[`button-variant-${variant}`]]: variant },
      className,
      {
        [s[`text-align`]]: children && socialButtons.includes(variant),
      },
>>>>>>> release
    )}
    type={type}
    onClick={onClickFn}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
<<<<<<< HEAD
  color: PropTypes.string,
=======
  variant: PropTypes.oneOf([
    '',
    'secondary',
    'link',
    'back',
    'google',
    'fb',
    'creditcard',
    'cleeng',
    'cleengwhite',
  ]),
>>>>>>> release
  onClickFn: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
};

Button.defaultProps = {
  className: '',
<<<<<<< HEAD
  color: '',
=======
  variant: '',
>>>>>>> release
  onClickFn: () => {},
  children: '',
  type: 'button',
};

export default withStyles(s)(Button);
