import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import { goToStep } from 'src/actions/checkoutStateActions';
import { onSuccessfulLogin } from 'src/actions/userActions';
import LocalRegister from 'src/components/containers/LocalRegister';
import Button from 'src/components/common/Button';
import SocialLogins from 'src/components/common/SocialLogins';

import s from './Register.css';

const name = 'Register';

export class Register extends Component {
  static propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    t: PropTypes.func,
  };
  static defaultProps = {
    t: () => {},
  };

  successfulLogin = (token, email) => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token, email);
  };
  goToLogin = () => {
    const { goToStep } = this.props;
    goToStep('login');
  };

  render() {
    const { t } = this.props;
    return (
      <div className={s.register}>
        <LocalRegister onComplete={this.successfulLogin} />
        <Button
          onClickFn={this.goToLogin}
          variant="secondary"
          className={s.buttonGoto}
        >
          {t('Have an account?')}
        </Button>
        <SocialLogins />
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
)(Register);
