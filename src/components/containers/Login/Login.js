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
import { onSuccessfulLogin } from 'src/actions/userActions';

import s from './Login.css';

const name = 'Login';

export class Login extends Component {
  static propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    t: PropTypes.func,
  };
  static defaultProps = {
    t: () => {},
  };

  successfulLogin = token => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token);
  };
  goToRegister = () => {
    const { goToStep } = this.props;
    goToStep('register');
  };

  render() {
    const { t } = this.props;
    return (
      <div className={s.login}>
        <LocalLogin onComplete={this.successfulLogin} />
        <Button
          onClickFn={this.goToRegister}
          color="white"
          className={s.buttonGoto}
        >
          {t('Go to register')}
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
    },
  ),
  translate(name),
  customLabeling(name),
)(Login);
