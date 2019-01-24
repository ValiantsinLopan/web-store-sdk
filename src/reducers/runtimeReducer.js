/* eslint-disable no-unused-vars */
import { SET_RUNTIME_VARIABLE } from 'src/constants';
import createReducer from 'src/lib/createReducer';

export default createReducer(
  {},
  {
    SET_RUNTIME_VARIABLE: (state, { payload }) => ({
      ...state,
      [payload.name]: payload.value,
    }),
  },
);
