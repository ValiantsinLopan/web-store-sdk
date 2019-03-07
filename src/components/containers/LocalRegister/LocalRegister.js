import PropTypes from 'prop-types';
import React from 'react';

import Authentication from '../../../services/authentication';

import LocalAuth from './../../common/LocalAuth';

export class LocalRegister extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func,
  };
  static defaultProps = {
    onComplete: () => {},
  };

  register = async ({ email, password }) => {
    const { onComplete } = this.props;
    try {
      const { token } = await Authentication.register({ email, password });
      onComplete(token, email);
    } catch (error) {
      return error;
    }
    return false;
  };

  render() {
    return (
      <div>
        <LocalAuth
          onSubmit={this.register}
          submitCopy="Register"
          isPassValideted
        />
      </div>
    );
  }
}

export default LocalRegister;
