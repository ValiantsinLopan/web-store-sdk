import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import cx from 'classnames';
import customLabeling from 'src/components/hoc/labeling';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { offerId } from 'src/config/config.client';
import Offer from 'src/services/offer';
import Input from 'src/components/common/Input';

import s from './CouponInput.css';

const name = 'CouponInput';

class CouponInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onCouponApplied: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    className: '',
    onCouponApplied: () => {},
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      couponApplied: false,
      msgShow: false,
    };
  }

  onFocus = () => {
    this.setState({
      msgShow: false,
    });
  };

  submitCoupon = async couponCode => {
    const { email, onCouponApplied, t } = this.props;
    try {
      const result = await Offer.reserveCoupon(offerId, email, couponCode);
      const couponInfo = await Offer.getCampaignInfo(couponCode);
      Promise.all([result, couponInfo]).then(values => {
        const discount = values[1].discount * 100;
        this.setState({
          ...this.state,
          message: t(
            'Your coupon has been applied! Enjoy your {{discount}}% discount.',
            {
              discount,
            },
          ),
          couponApplied: true,
          msgShow: true,
        });
        onCouponApplied(couponCode);
      });
    } catch (error) {
      this.setState({
        message: t(
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
        ),
        couponApplied: false,
        msgShow: true,
      });
    }

    setTimeout(() => {
      this.setState({
        msgShow: false,
      });
    }, 5000);
    return false;
  };

  getIndicatorText = (msgShow, success, fail) => {
    if (msgShow) {
      if (success) return 'correct';
      if (fail) return 'fail';
    }

    return '';
  };

  render() {
    const { className, t } = this.props;
    const { message, couponApplied, msgShow } = this.state;
    const success = message && couponApplied;
    const fail = message && !couponApplied;
    const classnames = cx(
      s.couponMsg,
      { [s.couponSuccess]: message && couponApplied },
      { [s.couponFail]: message && !couponApplied },
      { [s.msgShown]: msgShow },
      { [s.msgHidden]: !msgShow },
    );
    return (
      <div className={className}>
        <div className={classnames}>{message}</div>
        <Input
          name="coupon"
          autocomplete="off"
          placeholder={t('Redeem coupon')}
          icon="coupon"
          indicator={this.getIndicatorText(msgShow, success, fail)}
          onEnterFn={this.submitCoupon}
          onFocusFn={this.onFocus}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  translate(name),
  customLabeling(name),
)(CouponInput);
