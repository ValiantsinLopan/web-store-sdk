import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';

import s from './Input.css';

class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    autocomplete: PropTypes.string,
    className: PropTypes.string,
    inputType: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeFn: PropTypes.func,
    onBlurFn: PropTypes.func,
  };
  static defaultProps = {
    className: '',
    autocomplete: 'on',
    inputType: 'text',
    icon: '',
    placeholder: '',
    error: '',
    onChangeFn: () => {},
    onBlurFn: () => {},
  };

  render() {
    const {
      className,
      placeholder,
      inputType,
      name,
      autocomplete,
      onChangeFn,
      onBlurFn,
      icon,
      error,
    } = this.props;
    const classnamesInput = cx(s.input, s[className], {
      [s.error]: error !== '' || error === 'general',
    });
    const classnamesLabel = cx(s.label, s[icon]);
    const classnamesError = cx(s.errorField, s[className]);
    return (
      <label className={classnamesLabel}>
        <input
          className={classnamesInput}
          placeholder={placeholder}
          type={inputType}
          name={name}
          autoComplete={autocomplete}
          onChange={onChangeFn}
          onBlur={onBlurFn}
        />
        <div className={classnamesError}>{error !== 'general' && error}</div>
      </label>
    );
  }
}

export default compose(withStyles(s))(Input);
