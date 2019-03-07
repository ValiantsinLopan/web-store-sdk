import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';

import s from './Input.css';

const enterKeyCode = 13;

class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    autocomplete: PropTypes.string,
    className: PropTypes.string,
    inputType: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string,
    indicator: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeFn: PropTypes.func,
    onBlurFn: PropTypes.func,
    onFocusFn: PropTypes.func,
    onEnterFn: PropTypes.func,
  };
  static defaultProps = {
    className: '',
    autocomplete: 'on',
    inputType: 'text',
    icon: '',
    placeholder: '',
    error: '',
    indicator: '',
    value: '',
    onChangeFn: () => {},
    onBlurFn: () => {},
    onFocusFn: () => {},
    onEnterFn: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
    this.inputRef = React.createRef();
  }

  onChange = e => {
    const { onChangeFn } = this.props;
    const { value } = e.target;
    this.setState({ value });
    onChangeFn(value);
  };

  onKeyDown = e => {
    if (e.keyCode === enterKeyCode) {
      const { onEnterFn, name } = this.props;
      const { value } = this.state;
      onEnterFn(value);
      if (name === 'coupon') this.inputRef.current.blur();
    }
  };

  render() {
    const {
      className,
      placeholder,
      inputType,
      name,
      autocomplete,
      onBlurFn,
      onFocusFn,
      icon,
      error,
      indicator,
    } = this.props;
    const { value } = this.state;
    const classnamesInput = cx(
      s.input,
      s[className],
      {
        [s.error]: error !== '' || error === 'general',
      },
      {
        [s.fail]: indicator === 'fail',
      },
    );
    const classnamesLabel = cx(s.label, s[icon], s[indicator]);
    const classnamesError = cx(s.errorField, s[className]);
    return (
      <label className={classnamesLabel}>
        <input
          className={classnamesInput}
          placeholder={placeholder}
          type={inputType}
          name={name}
          value={value}
          autoComplete={autocomplete}
          onChange={this.onChange}
          onBlur={() => onBlurFn(value)}
          onFocus={onFocusFn}
          onKeyDown={this.onKeyDown}
          ref={this.inputRef}
        />
        <div className={classnamesError}>{error !== 'general' && error}</div>
      </label>
    );
  }
}

export default compose(withStyles(s))(Input);
