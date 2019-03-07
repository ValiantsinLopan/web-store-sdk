import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import LocalLogin from 'src/components/containers/LocalLogin';
import Button from 'src/components/common/Button';

import { goToStep } from 'src/actions/checkoutStateActions';
import { onSuccessfulLogin, setTempEmail } from 'src/actions/userActions';
import SocialLogins from 'src/components/common/SocialLogins';

import s from './Login.css';

const name = 'Login';

export class Login extends Component {
  static propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    setTempEmail: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    setTempEmail: () => {},
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  successfulLogin = (token, email) => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token, email);
  };
  goToRegister = () => {
    const { goToStep } = this.props;
    goToStep('register');
  };
  goToResetPassword = () => {
    const { goToStep, setTempEmail } = this.props;
    const { email } = this.state;
    setTempEmail(email);
    goToStep('passwordReset');
  };
  emailChanged = email => {
    this.setState({
      email,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div className={s.login}>
        <LocalLogin
          onComplete={this.successfulLogin}
          onEmailChange={this.emailChanged}
        />
        <Button
          onClickFn={this.goToRegister}
          variant="secondary"
          className={s.buttonGoto}
        >
          {t('Go to register')}
        </Button>
        <SocialLogins />
        <Button
          onClickFn={this.goToResetPassword}
          className={s.buttonResetPassword}
          variant="link"
        >
          {t('Forgot password?')}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    {
      onSuccessfulLogin,
      goToStep,
      setTempEmail,
    },
  ),
  translate(name),
  customLabeling(name),
)(Login);
