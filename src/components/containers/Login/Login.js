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
<<<<<<< HEAD
import { onSuccessfulLogin } from 'src/actions/userActions';
=======
import { onSuccessfulLogin, setTempEmail } from 'src/actions/userActions';
import SocialLogins from 'src/components/common/SocialLogins';
>>>>>>> release

import s from './Login.css';

const name = 'Login';

export class Login extends Component {
  static propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
<<<<<<< HEAD
    t: PropTypes.func,
  };
  static defaultProps = {
    t: () => {},
  };

  successfulLogin = token => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token);
=======
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
>>>>>>> release
  };
  goToRegister = () => {
    const { goToStep } = this.props;
    goToStep('register');
  };
<<<<<<< HEAD
=======
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
>>>>>>> release

  render() {
    const { t } = this.props;
    return (
      <div className={s.login}>
<<<<<<< HEAD
        <LocalLogin onComplete={this.successfulLogin} />
        <Button
          onClickFn={this.goToRegister}
          color="white"
=======
        <LocalLogin
          onComplete={this.successfulLogin}
          onEmailChange={this.emailChanged}
        />
        <Button
          onClickFn={this.goToRegister}
          variant="secondary"
>>>>>>> release
          className={s.buttonGoto}
        >
          {t('Go to register')}
        </Button>
<<<<<<< HEAD
=======
        <SocialLogins />
        <Button
          onClickFn={this.goToResetPassword}
          className={s.buttonResetPassword}
          variant="link"
        >
          {t('Forgot password?')}
        </Button>
>>>>>>> release
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
<<<<<<< HEAD
=======
      setTempEmail,
>>>>>>> release
    },
  ),
  translate(name),
  customLabeling(name),
)(Login);
