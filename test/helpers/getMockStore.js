import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
<<<<<<< HEAD
=======
import { createStore } from 'redux';
import reducer from 'src/reducers';
>>>>>>> release

const middlewares = [thunk];

export const mockStoreCreator = configureMockStore(middlewares);
<<<<<<< HEAD
=======

export const getMockStoreWithInitialReduxState = (initialState = {}) => {
  const realStore = createStore(reducer, initialState);
  return mockStoreCreator(realStore.getState());
};
>>>>>>> release
