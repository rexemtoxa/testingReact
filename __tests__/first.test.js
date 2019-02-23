import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TabsConstructor from '../src/TabsConstructor';

configure({ adapter: new Adapter() });

test('click1', () => {
  const wrapper = mount(<TabsConstructor />);
  const tab2 = wrapper.find('li[aria-controls="react-tabs-3"]');
  tab2.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  const tab1 = wrapper.find('li[aria-controls="react-tabs-1"]');
  tab1.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});
