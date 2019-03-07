import React from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/common/Input';

const EmailInput = ({ className, error, value, onChangeFn, onBlurFn }) => (
  <Input
    className={className}
    value={value}
    name="email"
    icon="email"
    error={error}
    onBlurFn={onBlurFn}
    onChangeFn={onChangeFn}
  />
);

EmailInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChangeFn: PropTypes.func,
  onBlurFn: PropTypes.func,
};

EmailInput.defaultProps = {
  className: '',
  error: '',
  value: '',
  onChangeFn: () => {},
  onBlurFn: () => {},
};

export default EmailInput;
