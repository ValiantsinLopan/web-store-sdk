import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import { validatePassword } from 'src/services/helper';
import { validateEmailField } from 'src/components/common/EmailInput/emailHelper';
import { validateConsentsField } from 'src/components/common/Consents/consentsHelper';

import EmailInput from 'src/components/common/EmailInput/EmailInput';
import PasswordInput from 'src/components/common/PasswordInput';
import Button from 'src/components/common/Button';
import Consents from 'src/components/common/Consents';

import s from './LocalAuth.css';

const name = 'LocalAuth';

export class LocalAuth extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitCopy: PropTypes.string.isRequired,
    isPassValideted: PropTypes.bool,
    onEmailChange: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    isPassValideted: false,
    onEmailChange: () => {},
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      consents: [],
      error: '',
      errorsField: {
        email: '',
        password: '',
        consents: '',
      },
      sendConsents: false,
      consentDefinitions: [],
    };
  }

  handlePasswordChange = value => {
    this.setState({
      password: value,
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
    });
  };

  validateField = (fieldType, value) => {
    const { t, isPassValideted } = this.props;
    let message = '';
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
    const { t } = this.props;
    const { consentDefinitions } = this.state;
    const errors = {
      email: validateEmailField(data.email, t),
      password: this.validateField('pass', data.password),
      consents: validateConsentsField(data.consents, consentDefinitions, t),
    };
    this.setState({ errorsField: errors });
    return !Object.keys(errors).find(key => errors[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, consents } = this.state;
    const { onSubmit, t } = this.props;
    this.setState({
      error: '',
    });
    if (this.validate({ email, password, consents })) {
      this.setState({ sendConsents: true });
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
        } else {
          this.setState({ sendConsents: false });
        }
      });
    }
  };

  onEmailBlur = () => {
    const { email } = this.state;
    const { t } = this.props;
    const message = validateEmailField(email, t);
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
    const { email, password, errorsField, error, sendConsents } = this.state;
    const { submitCopy } = this.props;
    const generalError = error ? s.generalError : '';
    return (
      <div className={s.wrapper}>
        {error && <div className={s.error}>{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <EmailInput
            className={generalError}
            value={email}
            error={error ? 'general' : errorsField.email}
            onBlurFn={this.onEmailBlur}
            onChangeFn={this.handleEmailChange}
          />
          <PasswordInput
            className={generalError}
            value={password}
            error={error ? 'general' : errorsField.password}
            onChangeFn={this.handlePasswordChange}
            isPassValideted={false}
          />
          {submitCopy === 'Register' && (
            <Consents
              error={errorsField.consents}
              sendConsents={sendConsents}
              onChangeFn={this.handleConsentsChange}
              email={email}
            />
          )}
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
