<<<<<<< HEAD
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Header.css';
import logo from './img/cleeng_logo_white.svg';

const Header = () => (
  <div className={s.header}>
    <div className={s.logo}>
      <img src={logo} alt="logo" />
    </div>
  </div>
);

export default withStyles(s)(Header);
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { goToStep } from 'src/actions/checkoutStateActions';
import Button from 'src/components/common/Button';

import s from './Header.css';
import logo from './img/logo.svg';

export class Header extends Component {
  static propTypes = {
    current: PropTypes.string,
    goToStep: PropTypes.func,
  };
  static defaultProps = {
    current: '',
    goToStep: () => {},
  };

  goBack = () => {
    const { goToStep } = this.props;
    goToStep('login');
  };

  render() {
    const { current } = this.props;
    return (
      <div className={s.header}>
        {current &&
          current !== 'login' && (
            <Button
              variant="back"
              onClickFn={this.goBack}
              className={s.goBackButton}
            >
              Back
            </Button>
          )}
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current:
    state.checkoutState.currentStep && state.checkoutState.currentStep.name,
});
export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    {
      goToStep,
    },
  ),
)(Header);
>>>>>>> release
