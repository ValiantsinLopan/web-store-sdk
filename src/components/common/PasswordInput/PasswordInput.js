import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import customLabeling from './../../hoc/labeling';

import Input from './../Input';

const name = 'PasswordInput';

class PasswordInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChangeFn: PropTypes.func,
    isPassValideted: PropTypes.bool,
    t: PropTypes.func,
  };
  static defaultProps = {
    error: '',
    onChangeFn: () => {},
    isPassValideted: false,
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      passError: '',
      errorLabel: '',
    };
  }

<<<<<<< HEAD
  onChangeFunction = e => {
    const { onChangeFn, isPassValideted } = this.props;
    const { value } = e.target;
=======
  onChangeFunction = value => {
    const { onChangeFn, isPassValideted } = this.props;
>>>>>>> release
    if (isPassValideted) {
      const passwordStrength = this.validateNewPassword(value);
      this.setState({
        passError: this.getErrorMessage(passwordStrength),
        errorLabel: passwordStrength,
      });
    }
    onChangeFn(value);
  };

  getErrorMessage = msg => {
    const { t } = this.props;
    const translations = {
      weak: t('Weak'),
      fair: t('Fair'),
      good: t('Good'),
      strong: t('Strong'),
      'too-short': t('Too short'),
    };

    return translations[msg];
  };

  validateNewPassword = pass => {
    let score = 0;
    if (pass && pass.length >= 6) {
      if (pass.match(/[a-z]/)) {
        score += 1;
      }
      if (pass.match(/[A-Z]/)) {
        score += 5;
      }
      if (pass.match(/\d+/) && !pass.match(/^[0-9]*$/)) {
        score += 5;
      }
      if (pass.match(/(\d.*\d)/)) {
        score += 5;
      }
      if (pass.match(/[!,@#$%^&*?_~]/)) {
        score += 5;
      }
      if (pass.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) {
        score += 5;
      }
      if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) {
        score += 2;
      }
      if (pass.match(/\d/) && pass.match(/\D/)) {
        score += 2;
      }
      if (
        pass.match(/[a-z]/) &&
        pass.match(/[A-Z]/) &&
        pass.match(/\d/) &&
        pass.match(/[!,@#$%^&*?_~]/)
      ) {
        score += 2;
      }
      if (score <= 8) {
        return 'weak';
      } else if (score > 8 && score <= 16) {
        return 'fair';
      } else if (score > 16 && score <= 24) {
        return 'good';
      } else if (score > 24 && score <= 32) {
        return 'strong';
      }
    } else {
      return 'too-short';
    }

    return '';
  };

  render() {
    const { value, error } = this.props;
    const { passError, errorLabel } = this.state;
    const errorMsg = error || passError;
    return (
      <Input
        className={errorLabel}
        value={value}
        inputType="password"
        name="password"
        autocomplete="off"
        icon="pass"
        error={errorMsg}
        onChangeFn={this.onChangeFunction}
      />
    );
  }
}

export default compose(
  translate(name),
  customLabeling(name),
)(PasswordInput);
