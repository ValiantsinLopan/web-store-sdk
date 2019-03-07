import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';

import { offerId } from 'src/config/config.client';
import Offer from 'src/services/offer';
import { setOfferDetails, setPrice, setTrial } from 'src/actions/offerActions';
import Loader from 'src/components/common/Loader/Loader';
import Payments from 'src/components/containers/Payments/Payments';
import CouponInput from 'src/components/common/CouponInput/CouponInput';

import { getOfferDescription, getOfferType } from './offerDescriptionHelper';

import offerimg from './img/offerimg.png';

import s from './OfferDetails.css';

const name = 'OfferDetails';

class OfferDetails extends React.Component {
  static propTypes = {
    offerTitle: PropTypes.string,
    priceExclTax: PropTypes.number,
    priceExclTaxBeforeDiscount: PropTypes.number,
    customerCurrencySymbol: PropTypes.string,
    offerPeriod: PropTypes.string,
    freePeriods: PropTypes.number,
    expiresAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    setOfferDetails: PropTypes.func,
    setPrice: PropTypes.func,
    setTrial: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    offerTitle: '',
    priceExclTax: 0,
    priceExclTaxBeforeDiscount: null,
    customerCurrencySymbol: '$',
    offerPeriod: '',
    freePeriods: 0,
    expiresAt: null,
    email: '',
    setOfferDetails: () => {},
    setPrice: () => {},
    setTrial: () => {},
    t: () => {},
  };

  abortController = new window.AbortController();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      hasTrial: false,
      couponApplied: false,
    };
  }
  componentDidMount() {
    this.checkIfHasTrial();
    this.getOfferDetails();
  }
  componentWillUnmount() {
    this.abortController.abort();
  }

  async getOfferDetails() {
    const { setOfferDetails } = this.props;
    try {
      const result = await Offer.getOffer(offerId, this.abortController);
      this.setState({
        loading: false,
      });
      setOfferDetails(result);
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      });
    }
    return false;
  }

  async checkIfHasTrial() {
    const { setTrial, email } = this.props;
    try {
      const data = await Offer.checkIfHasTrial(offerId, email);
      if (data.trialAvailable) {
        this.setState({
          ...this.state,
          hasTrial: true,
        });
        setTrial();
      }
    } catch (error) {
      return error;
    }
    return false;
  }

  getOfferDescription() {
    const { t, offerPeriod, expiresAt } = this.props;
    const { error } = this.state;

    return !error
      ? getOfferDescription(t, getOfferType(offerId), {
          offerPeriod,
          expiresAt,
        })
      : '';
  }

  onCouponApplied = async couponCode => {
    const { setPrice } = this.props;
    try {
      const result = await Offer.getPrice(offerId, couponCode);
      if (result) setPrice(result);
      this.setState({
        ...this.state,
        couponApplied: true,
      });
    } catch (error) {
      return error;
    }
    return false;
  };

  roundPrice = value => Math.round(value * 100) / 100;

  render() {
    const {
      offerTitle,
      customerCurrencySymbol,
      priceExclTax,
      priceExclTaxBeforeDiscount,
      freePeriods,
      offerPeriod,
      email,
      t,
    } = this.props;
    const { loading, error, hasTrial, couponApplied } = this.state;

    const price = this.roundPrice(priceExclTax);
    const priceBeforeDiscount =
      priceExclTaxBeforeDiscount && this.roundPrice(priceExclTaxBeforeDiscount);

    return loading ? (
      <div className={s.loaderWrapper}>
        <Loader />
      </div>
    ) : (
      <div className={s.offerWrapper}>
        <div className={s.offerBody}>
          <div className={s.title}>{t('Complete your purchase')}</div>
          <div className={s.offerContent}>
            <img className={s.offerImg} src={offerimg} alt="Offer" />
            <div className={s.offerDetailsAndCoupon}>
              <div className={s.offerDetailsWrapper}>
                <div className={s.offerTitle}>
                  {!error ? offerTitle : t('This is not a valid offer.')}
                </div>
                <div className={s.offerDetails}>
                  <div className={s.offerDescription}>
                    {hasTrial && (
                      <div className={s.trialDescription}>
                        {t('You will be charged {{price}} after {{period}}.', {
                          price: `${customerCurrencySymbol}${price}`,
                          period: `${freePeriods} ${offerPeriod}`,
                        })}
                      </div>
                    )}
                    {this.getOfferDescription()}
                  </div>
                  <div className={s.offerDetailsPrice}>
                    {hasTrial && (
                      <div className={s.trial}>{t('trial period')}</div>
                    )}
                    <div className={s.price}>
                      {`${customerCurrencySymbol}${price} `}
                      <span>{`(${t('exVAT')})`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CouponInput
                email={email}
                className={s.coupon}
                onCouponApplied={this.onCouponApplied}
              />
            </div>
          </div>
          <div className={s.totalWrapper}>
            {couponApplied && (
              <React.Fragment>
                <div className={s.priceBeforeWrapper}>
                  <div className={s.totalLabel}>{`${t('Price')}:`}</div>
                  <div className={s.offerPrice}>
                    {`${customerCurrencySymbol}${priceBeforeDiscount} `}
                    <span>{`(${t('exVAT')})`}</span>
                  </div>
                </div>
                <div className={s.couponDiscountWrapper}>
                  <div className={s.totalLabel}>
                    {`${t('Coupon Discount')}:`}
                  </div>
                  <div className={s.offerPrice}>
                    {`${customerCurrencySymbol}${this.roundPrice(
                      priceBeforeDiscount - price,
                    )}`}
                  </div>
                </div>
              </React.Fragment>
            )}
            <div className={s.priceWrapper}>
              <div className={s.totalLabel}>{`${t('Total')}:`}</div>
              <div className={s.offerPrice}>
                {`${customerCurrencySymbol}${price} `}
                <span>{`(${t('exVAT')})`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.offerPayment}>
          <Payments />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offerTitle: state.offer.offerTitle,
  priceExclTax: state.offer.priceExclTax,
  priceExclTaxBeforeDiscount: state.offer.priceExclTaxBeforeDiscount,
  customerCurrencySymbol: state.offer.customerCurrencySymbol,
  offerPeriod: state.offer.period,
  expiresAt: state.offer.expiresAt,
  freePeriods: state.offer.freePeriods,
  email: state.user.email,
});
export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    {
      setOfferDetails,
      setPrice,
      setTrial,
    },
  ),
  translate(name),
  customLabeling(name),
)(OfferDetails);
