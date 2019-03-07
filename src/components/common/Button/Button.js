import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-unused-class */
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

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
    )}
    type={type}
    onClick={onClickFn}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
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
  onClickFn: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  variant: '',
  onClickFn: () => {},
  children: '',
  type: 'button',
};

export default withStyles(s)(Button);
