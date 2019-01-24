import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import { validateEmail, validatePassword } from 'src/services/helper';

import PasswordInput from './../PasswordInput';
import Input from './../Input';
import Button from './../Button';
import s from './LocalAuth.css';

const name = 'LocalAuth';

export class LocalAuth extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitCopy: PropTypes.string.isRequired,
    isPassValideted: PropTypes.bool,
    t: PropTypes.func,
  };
  static defaultProps = {
    isPassValideted: false,
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      errorsField: {
        email: '',
        password: '',
      },
    };
  }

  handlePasswordChange = value => {
    this.setState({
      password: value,
      errorsField: { password: '' },
    });
  };

  handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateField = (fieldType, value) => {
    const { t, isPassValideted } = this.props;
    let message = '';
    if (fieldType === 'email' && !validateEmail(value)) {
      message = t('The email address is not properly formatted.');
    }
    if (fieldType === 'pass' && isPassValideted && !validatePassword(value)) {
      message = t(
        'Your password must contain at least 6 characters, including 1 digit.',
      );
    }
    if (value === '') {
      message = t('Please fill out this field.');
    }

    return message;
  };

  validate = data => {
    const errors = {
      email: this.validateField('email', data.email),
      password: this.validateField('pass', data.password),
    };
    this.setState({ errorsField: errors });

    return !Object.keys(errors).find(key => errors[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onSubmit, t } = this.props;
    this.setState({
      error: '',
    });
    if (this.validate({ email, password })) {
      onSubmit({ email, password }).then(data => {
        if (data) {
          const errorsTranslations = {
            15: t('Incorrect login or password'),
            13: t('Customer already exists.'),
            default: t('An error occured.'),
          };
          this.setState({
            error: errorsTranslations[data.code]
              ? errorsTranslations[data.code]
              : errorsTranslations.default,
          });
        }
      });
    }
  };

  onEmailBlur = () => {
    const { email } = this.state;
    const message = this.validateField('email', email);
    this.setState({ errorsField: { email: message } });
  };

  getSubmitCopy = () => {
    const { t, submitCopy } = this.props;
    const submitCopyTranslations = {
      'Log in': t('Log in'),
      Register: t('Register'),
    };
    return submitCopyTranslations[submitCopy];
  };

  render() {
    const { email, password, errorsField, error } = this.state;
    const generalError = error ? s.generalError : '';
    return (
      <div className={s.wrapper}>
        {error && <div className={s.error}>{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <Input
            className={generalError}
            name="email"
            value={email}
            icon="email"
            error={error ? 'general' : errorsField.email}
            onBlurFn={this.onEmailBlur}
            onChangeFn={this.handleInputChange}
          />
          <PasswordInput
            className={generalError}
            value={password}
            error={error ? 'general' : errorsField.password}
            onChangeFn={this.handlePasswordChange}
            isPassValideted={false}
          />
          <Button type="submit">{this.getSubmitCopy()}</Button>
        </form>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  translate(name),
  customLabeling(name),
)(LocalAuth);
