import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../src/component/App';

test('snapshot testing to toggle tab', () => {
  const wrapper = mount(<App />);
  expect(wrapper.render()).toMatchSnapshot();
  const tabs = wrapper.find('[data-test="tab-anchor"]');
  const tab2 = tabs.at(2);
  tab2.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});

test('jest-enzyme testyng to toggle tab', () => {
  const wrapper = mount(<App />);
  const tabs = wrapper.find('li[data-test="tab-anchor"]');
  const firstTab = tabs.at(0);
  const secondTab = tabs.at(1);

  expect(firstTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(secondTab).not.toHaveClassName('react-tabs__tab--selected');
});

test('jest-enzyme testyng to toggle tab 2', () => {
  const wrapper = mount(<App />);
  wrapper.find('li[data-test="tab-anchor"]').at(1).simulate('click');

  const tabs = wrapper.find('li[data-test="tab-anchor"]');
  const firstTab = tabs.at(0);
  const secondTab = tabs.at(1);
  expect(secondTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(firstTab).not.toHaveClassName('react-tabs__tab--selected');
});
