import PropTypes from 'prop-types';
import React from 'react';

import Authentication from '../../../services/authentication';

import LocalAuth from './../../common/LocalAuth';

export class LocalLogin extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func,
  };
  static defaultProps = {
    onComplete: () => {},
  };

  login = async ({ email, password }) => {
    const { onComplete } = this.props;
    try {
      const { token } = await Authentication.login({ email, password });
      if (!token) throw Error('Unauthorized');

      if (onComplete) {
        onComplete(token);
      }
    } catch (error) {
      return error;
    }
    return false;
  };

  render() {
    return <LocalAuth onSubmit={this.login} submitCopy="Log in" />;
  }
}

export default LocalLogin;
