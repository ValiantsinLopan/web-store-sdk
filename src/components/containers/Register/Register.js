import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import { goToStep } from 'src/actions/checkoutStateActions';
import { onSuccessfulLogin } from 'src/actions/userActions';
<<<<<<< HEAD

import s from './Register.css';

import LocalRegister from './../LocalRegister';
import Button from './../../common/Button';

=======
import LocalRegister from 'src/components/containers/LocalRegister';
import Button from 'src/components/common/Button';
import SocialLogins from 'src/components/common/SocialLogins';

import s from './Register.css';

>>>>>>> release
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

<<<<<<< HEAD
  successfulLogin = token => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token);
=======
  successfulLogin = (token, email) => {
    const { onSuccessfulLogin } = this.props;
    onSuccessfulLogin(token, email);
>>>>>>> release
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
<<<<<<< HEAD
          color="white"
          className={s.buttonGoto}
        >
          {t('Go to login')}
        </Button>
=======
          variant="secondary"
          className={s.buttonGoto}
        >
          {t('Have an account?')}
        </Button>
        <SocialLogins />
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
    },
  ),
  translate(name),
  customLabeling(name),
)(Register);
