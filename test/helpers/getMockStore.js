import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import reducer from 'src/reducers';

const middlewares = [thunk];

export const mockStoreCreator = configureMockStore(middlewares);

export const getMockStoreWithInitialReduxState = (initialState = {}) => {
  const realStore = createStore(reducer, initialState);
  return mockStoreCreator(realStore.getState());
};
