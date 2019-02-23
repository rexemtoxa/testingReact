import React from 'react';
import { mount } from 'enzyme';
import App from '../src/component/App';

test('click1', () => {
  const wrapper = mount(<App />);
  expect(wrapper.render()).toMatchSnapshot();
  const tabs = wrapper.find('[data-test="tab-anchor"]');
  const tab2 = tabs.at(2);
  tab2.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});
