import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => {
    /* eslint-disable no-param-reassign */
    Component.defaultProps = { ...Component.defaultProps, t: k => k };
    return Component;
  },
}));

Enzyme.configure({ adapter: new Adapter() });
