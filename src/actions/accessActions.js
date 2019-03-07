import { SET_REGISTERED_FLAG } from 'src/constants';
import { goToStep } from './checkoutStateActions';

export function setRegistered() {
  return {
    type: SET_REGISTERED_FLAG,
  };
}

export const subscriptionRegistered = () => dispatch => {
  dispatch(setRegistered());
  dispatch(goToStep('thankYouPage'));
};
