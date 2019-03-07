import PropTypes from 'prop-types';
import React from 'react';

import Authentication from '../../../services/authentication';

import LocalAuth from './../../common/LocalAuth';

export class LocalLogin extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func,
    onEmailChange: PropTypes.func,
  };
  static defaultProps = {
    onComplete: () => {},
    onEmailChange: () => {},
  };

  login = async ({ email, password }) => {
    const { onComplete } = this.props;
    try {
      const { token } = await Authentication.login({ email, password });
      if (!token) throw Error('Unauthorized');

      if (onComplete) {
        onComplete(token, email);
      }
    } catch (error) {
      return error;
    }
    return false;
  };

  render() {
    const { onEmailChange } = this.props;
    return (
      <LocalAuth
        onSubmit={this.login}
        onEmailChange={onEmailChange}
        submitCopy="Log in"
      />
    );
  }
}

export default LocalLogin;
