import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import Button from 'src/components/common/Button';
import EmailInput from 'src/components/common/EmailInput/EmailInput';
import { validateEmailField } from 'src/components/common/EmailInput/emailHelper';

import Authentication from 'src/services/authentication';

import s from './PasswordReset.css';

const name = 'PasswordReset';

export class PasswordReset extends Component {
  static propTypes = {
    email: PropTypes.string,
    onSuccess: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    email: '',
    onSuccess: () => {},
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.email || '',
      error: '',
      sent: false,
    };
  }

  sentAgain = () => {
    this.setState({
      email: '',
      error: '',
      sent: false,
    });
  };

  validate = () => {
    const { email } = this.state;
    const { t } = this.props;
    this.setState({
      error: '',
    });
    const errorMessage = validateEmailField(email, t);
    if (errorMessage !== '') {
      this.setState({
        error: errorMessage,
      });
      return false;
    }
    return true;
  };

  onPasswordReset = async () => {
    const { onSuccess, t } = this.props;
    const { email } = this.state;
    if (this.validate()) {
      try {
        const result = await Authentication.resetPassword({ email });
        if (result.success) {
          this.setState({ sent: true });
          onSuccess();
        }
      } catch (error) {
        const errorsTranslations = {
          10: t(
            "Customer is not associated with your account or doesn't exist.",
          ),
        };
        this.setState({
          error: errorsTranslations[error.code],
        });
        return error;
      }
    }

    return false;
  };

  handleEmailChange = value => {
    this.setState({
      email: value,
    });
  };

  render() {
    const { t } = this.props;
    const { email, sent, error } = this.state;
    const classnames = cx(s.checkmark, s.draw);
    return (
      <div className={s.passwordReset}>
        {!sent ? (
          <React.Fragment>
            <div className={s.title}>{t('Forgot your password?')}</div>
            <div className={s.subtitle}>
              {t(
                'Just enter your email address below and we will send you a link to reset your password',
              )}
            </div>
            <div className={s.passwordResetForm}>
              <EmailInput
                value={email}
                error={error}
                onChangeFn={this.handleEmailChange}
                placeholder={t('Email address')}
              />
              <Button
                onClickFn={this.onPasswordReset}
                className={s.passwordResetButton}
              >
                {t('Reset Password')}
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={s.circleLoader}>
              <div className={classnames} />
            </div>
            <div className={s.sentTitle}>{t('Password link sent')}</div>
            <div className={s.sentSubtitle}>{`${t(
              'Please check your inbox at',
            )} ${email}`}</div>
            <div className={s.sentMessage}>
              {t('Not sure that was the right email address?')}
              <Button
                onClickFn={this.sentAgain}
                variant="link"
                className={s.passwordGoBackButton}
              >
                {t('Try again.')}
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  translate(name),
  customLabeling(name),
)(PasswordReset);
