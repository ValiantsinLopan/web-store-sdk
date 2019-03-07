import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { translate } from 'react-i18next';
import customLabeling from 'src/components/hoc/labeling';
import Button from 'src/components/common/Button';

import s from './SocialLogins.css';

const name = 'SocialLogins';

export class SocialLogins extends Component {
  static propTypes = {
    t: PropTypes.func,
  };
  static defaultProps = {
    t: () => {},
  };

  render() {
    const { t } = this.props;
    return (
      <div className={s.sociallogins}>
        <label className={s.label}>Or</label>
        <Button onClickFn={() => {}} variant="google">
          {t('Sign up with Google')}
        </Button>
        <Button
          onClickFn={() => {}}
          variant="fb"
          className={s.buttonSocialSecond}
        >
          {t('Sign up with Facebook')}
        </Button>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  translate(name),
  customLabeling(name),
)(SocialLogins);
