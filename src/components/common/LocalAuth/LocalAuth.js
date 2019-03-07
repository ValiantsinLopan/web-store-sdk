import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

<<<<<<< HEAD
import { validateEmail, validatePassword } from 'src/services/helper';

import PasswordInput from './../PasswordInput';
import Input from './../Input';
import Button from './../Button';
=======
import { validatePassword } from 'src/services/helper';
import { validateEmailField } from 'src/components/common/EmailInput/emailHelper';
import { validateConsentsField } from 'src/components/common/Consents/consentsHelper';

import EmailInput from 'src/components/common/EmailInput/EmailInput';
import PasswordInput from 'src/components/common/PasswordInput';
import Button from 'src/components/common/Button';
import Consents from 'src/components/common/Consents';

>>>>>>> release
import s from './LocalAuth.css';

const name = 'LocalAuth';

export class LocalAuth extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitCopy: PropTypes.string.isRequired,
    isPassValideted: PropTypes.bool,
<<<<<<< HEAD
=======
    onEmailChange: PropTypes.func,
>>>>>>> release
    t: PropTypes.func,
  };
  static defaultProps = {
    isPassValideted: false,
<<<<<<< HEAD
=======
    onEmailChange: () => {},
>>>>>>> release
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
<<<<<<< HEAD
=======
      consents: [],
>>>>>>> release
      error: '',
      errorsField: {
        email: '',
        password: '',
<<<<<<< HEAD
      },
=======
        consents: '',
      },
      sendConsents: false,
      consentDefinitions: [],
>>>>>>> release
    };
  }

  handlePasswordChange = value => {
    this.setState({
      password: value,
<<<<<<< HEAD
      errorsField: { password: '' },
    });
  };

  handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
=======
      errorsField: {
        ...this.state.errorsField,
        password: '',
      },
    });
  };

  handleEmailChange = value => {
    const { onEmailChange } = this.props;
    this.setState({
      email: value,
      errorsField: {
        ...this.state.errorsField,
        email: '',
      },
    });
    onEmailChange(value);
  };

  handleConsentsChange = (value, consentDefinitions) => {
    this.setState({
      ...this.state,
      consents: value,
      consentDefinitions,
      errorsField: {
        ...this.state.errorsField,
        consents: '',
      },
>>>>>>> release
    });
  };

  validateField = (fieldType, value) => {
    const { t, isPassValideted } = this.props;
    let message = '';
<<<<<<< HEAD
    if (fieldType === 'email' && !validateEmail(value)) {
      message = t('The email address is not properly formatted.');
    }
=======
>>>>>>> release
    if (fieldType === 'pass' && isPassValideted && !validatePassword(value)) {
      message = t(
        'Your password must contain at least 6 characters, including 1 digit.',
      );
    }
    if (value === '') {
      message = t('Please fill out this field.');
    }
<<<<<<< HEAD

=======
>>>>>>> release
    return message;
  };

  validate = data => {
<<<<<<< HEAD
    const errors = {
      email: this.validateField('email', data.email),
      password: this.validateField('pass', data.password),
    };
    this.setState({ errorsField: errors });

=======
    const { t } = this.props;
    const { consentDefinitions } = this.state;
    const errors = {
      email: validateEmailField(data.email, t),
      password: this.validateField('pass', data.password),
      consents: validateConsentsField(data.consents, consentDefinitions, t),
    };
    this.setState({ errorsField: errors });
>>>>>>> release
    return !Object.keys(errors).find(key => errors[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
<<<<<<< HEAD
    const { email, password } = this.state;
=======
    const { email, password, consents } = this.state;
>>>>>>> release
    const { onSubmit, t } = this.props;
    this.setState({
      error: '',
    });
<<<<<<< HEAD
    if (this.validate({ email, password })) {
=======
    if (this.validate({ email, password, consents })) {
      this.setState({ sendConsents: true });
>>>>>>> release
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
<<<<<<< HEAD
=======
        } else {
          this.setState({ sendConsents: false });
>>>>>>> release
        }
      });
    }
  };

  onEmailBlur = () => {
    const { email } = this.state;
<<<<<<< HEAD
    const message = this.validateField('email', email);
=======
    const { t } = this.props;
    const message = validateEmailField(email, t);
>>>>>>> release
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
<<<<<<< HEAD
    const { email, password, errorsField, error } = this.state;
=======
    const { email, password, errorsField, error, sendConsents } = this.state;
    const { submitCopy } = this.props;
>>>>>>> release
    const generalError = error ? s.generalError : '';
    return (
      <div className={s.wrapper}>
        {error && <div className={s.error}>{error}</div>}
        <form onSubmit={this.handleSubmit}>
<<<<<<< HEAD
          <Input
            className={generalError}
            name="email"
            value={email}
            icon="email"
            error={error ? 'general' : errorsField.email}
            onBlurFn={this.onEmailBlur}
            onChangeFn={this.handleInputChange}
=======
          <EmailInput
            className={generalError}
            value={email}
            error={error ? 'general' : errorsField.email}
            onBlurFn={this.onEmailBlur}
            onChangeFn={this.handleEmailChange}
>>>>>>> release
          />
          <PasswordInput
            className={generalError}
            value={password}
            error={error ? 'general' : errorsField.password}
            onChangeFn={this.handlePasswordChange}
            isPassValideted={false}
          />
<<<<<<< HEAD
=======
          {submitCopy === 'Register' && (
            <Consents
              error={errorsField.consents}
              sendConsents={sendConsents}
              onChangeFn={this.handleConsentsChange}
              email={email}
            />
          )}
>>>>>>> release
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
