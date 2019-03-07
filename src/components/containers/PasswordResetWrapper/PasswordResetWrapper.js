import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PasswordReset from 'src/components/common/PasswordReset/PasswordReset';

export class PasswordResetWrapper extends Component {
  static propTypes = {
    tempEmail: PropTypes.string,
  };
  static defaultProps = {
    tempEmail: '',
  };

  render() {
    const { tempEmail } = this.props;
    return <PasswordReset email={tempEmail} />;
  }
}

const mapStateToProps = state => ({
  tempEmail: state.user.tempEmail,
});
export default compose(
  connect(
    mapStateToProps,
    {},
  ),
)(PasswordResetWrapper);
