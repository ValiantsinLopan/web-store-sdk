import PropTypes from 'prop-types';
import React from 'react';

import Authentication from '../../../services/authentication';

import LocalAuth from './../../common/LocalAuth';

export class LocalLogin extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func,
<<<<<<< HEAD
  };
  static defaultProps = {
    onComplete: () => {},
=======
    onEmailChange: PropTypes.func,
  };
  static defaultProps = {
    onComplete: () => {},
    onEmailChange: () => {},
>>>>>>> release
  };

  login = async ({ email, password }) => {
    const { onComplete } = this.props;
    try {
      const { token } = await Authentication.login({ email, password });
      if (!token) throw Error('Unauthorized');

      if (onComplete) {
<<<<<<< HEAD
        onComplete(token);
=======
        onComplete(token, email);
>>>>>>> release
      }
    } catch (error) {
      return error;
    }
    return false;
  };

  render() {
<<<<<<< HEAD
    return <LocalAuth onSubmit={this.login} submitCopy="Log in" />;
=======
    const { onEmailChange } = this.props;
    return (
      <LocalAuth
        onSubmit={this.login}
        onEmailChange={onEmailChange}
        submitCopy="Log in"
      />
    );
>>>>>>> release
  }
}

export default LocalLogin;
