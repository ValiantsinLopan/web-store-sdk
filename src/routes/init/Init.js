import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from 'src/styles/fonts.css';
import { setCheckoutSteps, goToStep } from 'src/actions/checkoutStateActions';

import config from 'src/config/config.client';

import OfferDetails from 'src/components/containers/OfferDetails';
import Login from 'src/components/containers/Login';
import Register from 'src/components/containers/Register';
import PasswordResetWrapper from 'src/components/containers/PasswordResetWrapper/PasswordResetWrapper';
import ThankYouPage from 'src/components/common/ThankYouPage/ThankYouPage';

class Init extends React.Component {
  static propTypes = {
    currentStep: PropTypes.shape({
      name: PropTypes.string,
    }),
    goToStep: PropTypes.func,
    setCheckoutSteps: PropTypes.func,
  };

  static defaultProps = {
    currentStep: {
      name: '',
    },
    goToStep: () => {},
    setCheckoutSteps: () => {},
  };

  componentDidMount() {
    this.props.setCheckoutSteps();
    this.props.goToStep('login');
  }

  getComponentOfState() {
    return (
      this.props.currentStep &&
      {
        login: <Login />,
        register: <Register />,
        offerDetails: <OfferDetails />,
        passwordReset: <PasswordResetWrapper />,
        thankYouPage: <ThankYouPage />,
      }[this.props.currentStep.name]
    );
  }

  render() {
    const component = this.getComponentOfState();
    return this.props.currentStep && component ? component : null;
  }
}

const mapDispatchToProps = dispatch => ({
  setCheckoutSteps: (steps = config.checkoutSteps) =>
    dispatch(setCheckoutSteps(steps)),
  goToStep: step => dispatch(goToStep(step)),
});

const mapStateToProps = state => ({
  currentStep: state.checkoutState.currentStep || null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(Init));
