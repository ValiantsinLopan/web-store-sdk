import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class OfferDetails extends React.Component {
  static propTypes = {
    username: PropTypes.string,
  };
  static defaultProps = {
    username: '',
  };
  render() {
    const { username } = this.props;
    return <div>Access for the user: {username}</div>;
  }
}

const mapStateToProps = state => ({
  username: state.user.displayName,
});
export default compose(connect(mapStateToProps))(OfferDetails);
