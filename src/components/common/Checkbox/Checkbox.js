import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-unused-class */
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkbox.css';

const Checkbox = ({
  className,
  children,
  onClickFn,
  error,
  checked,
  required,
}) => (
  <div
    className={cx(s.checkbox, s[className])}
    onClick={onClickFn}
    role="checkbox"
    tabIndex="-1"
    aria-checked="false"
    onKeyDown={() => {}}
    checked={checked}
  >
    <div className={cx(s.checkFrame, { [s.error]: error !== '' && required })}>
      {checked && <div className={cx(s.checkMark)} />}
    </div>
    <label
      className={s.consentDefinition}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  </div>
);

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onClickFn: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: '',
  error: '',
  checked: false,
  onClickFn: () => {},
  children: '',
  required: false,
};

export default withStyles(s)(Checkbox);
