import React from 'react';
import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Layout from '../Layout';

describe('<Layout/>', () => {
  const renderComponent = testComponentHelper(Layout);

  describe('@renders', () => {
    const initialProps = {
      children: <div>Children</div>,
    };
    it('should render initial state', () => {
      const { wrapper } = renderComponent(initialProps);
      expect(wrapper.hasClass('root')).toBe(true);
      expect(wrapper.exists('Header')).toBe(true);
    });
  });
});
