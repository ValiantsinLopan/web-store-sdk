import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Access from 'src/services/access';
import { subscriptionRegistered } from 'src/actions/accessActions';
import Button from 'src/components/common/Button';

import s from './Payments.css';

class Payments extends React.Component {
  static propTypes = {
    subscriptionRegistered: PropTypes.func,
    email: PropTypes.string,
    customerId: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    expiresAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  static defaultProps = {
    subscriptionRegistered: () => {},
    email: '',
    customerId: '',
    country: '',
    currency: '',
    expiresAt: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentShown: false,
    };
  }

  purchaseCompleted = async () => {
    const {
      subscriptionRegistered,
      email,
      expiresAt,
      customerId,
      country,
      currency,
    } = this.props;

    // To proceed with payment you need to create an order and use this order id in payment proccess
    try {
      const done = await Access.createOrderFromOffer({
        customerId,
        currency,
        country,
      });
      if (done.success) {
        // transaction ID -> done.order.id
      }
    } catch (error) {
      return error;
    }

    // after payment is succeeded - register an subscription
    try {
      const doneSubscription = await Access.registerSubscription({
        email,
        expiresAt,
      });
      if (doneSubscription.success) {
        subscriptionRegistered();
      }
    } catch (error) {
      return error;
    }

    return false;
  };

  togglePayment = () => {
    this.setState({
      paymentShown: !this.state.paymentShown,
    });
  };

  render() {
    const { paymentShown } = this.state;
    const paymentsContentClasses = cx(s.paymentsWrapper, {
      [s.shown]: paymentShown,
    });
    return (
      <div className={s.payments}>
        <div className={s.methodsWrapper}>
          <div>Purchase using</div>
          <div className={s.paymentsMethods}>
            <Button
              onClickFn={this.togglePayment}
              variant="creditcard"
              className={s.creditCardButton}
            >
              Credit card
            </Button>
          </div>
        </div>
        <div className={paymentsContentClasses}>
          <div className={s.paymentContent}>
            In this placeholder you can place the hosted payment fields from the
            payment gateway of choice
          </div>
          <div className={s.paymentConfirmation}>
            <Button
              onClickFn={this.purchaseCompleted}
              className={s.confirmButton}
            >
              Confirm purchase
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  customerId: state.user.id,
  expiresAt: state.offer.expiresAt,
  currency: state.user.currency,
  country: state.user.country,
});

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    {
      subscriptionRegistered,
    },
  ),
)(Payments);
