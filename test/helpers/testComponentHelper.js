import React from 'react';
import { shallow } from 'enzyme';

const renderComponentHelper = Component => ({ children, ...props } = {}) => {
  const wrapper = shallow(
    <Component t={key => key} {...props}>
      {children}
    </Component>,
  );

  const component = {
    wrapper,
    instance: wrapper.instance(),
  };

  return component;
};

const renderComponentWithLabeling = Component => ({
  children,
  ...props
} = {}) => {
  const wrapper = shallow(
    <Component t={key => key} {...props}>
      {children}
    </Component>,
  )
    .first()
    .shallow();

  const component = {
    wrapper,
    instance: wrapper.instance(),
  };

  return component;
};

export default renderComponentHelper;
export { renderComponentWithLabeling };
