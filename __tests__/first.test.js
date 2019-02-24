import React from 'react';
import { mount } from 'enzyme';
import App from '../src/component/App';

test('snapshot testing to toggle tab', () => {
  const wrapper = mount(<App />);
  expect(wrapper.render()).toMatchSnapshot();
  const tabs = wrapper.find('[data-test="tab-anchor"]');
  const tab2 = tabs.at(2);
  tab2.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});

test('toggle tab', () => {
  const wrapper = mount(<App />);
  const tabs = wrapper.find('li[data-test="tab-anchor"]');
  const firstTab = tabs.at(0);
  const secondTab = tabs.at(1);

  expect(firstTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(secondTab).not.toHaveClassName('react-tabs__tab--selected');
});

test('toggle tab 2', () => {
  const wrapper = mount(<App />);
  wrapper.find('li[data-test="tab-anchor"]').at(1).simulate('click');
  const tabs = wrapper.find('li[data-test="tab-anchor"]');
  const firstTab = tabs.at(0);
  const secondTab = tabs.at(1);

  expect(secondTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(firstTab).not.toHaveClassName('react-tabs__tab--selected');
});

test('add new rab', () => {
  const wrapper = mount(<App />);
  const tabsBeforeUpdate = wrapper.find('div[data-test="tabBox"]');
  expect(tabsBeforeUpdate).toContainMatchingElements(5, 'li[data-test="tab-anchor"]');

  const buttonAdd = wrapper.find('button[data-test="addTab"]');
  buttonAdd.last().simulate('submit');
  const tabsAfterUpdate = wrapper.find('[data-test="tabBox"]');
  expect(tabsAfterUpdate).toContainMatchingElements(6, 'li[data-test="tab-anchor"]');
});

it('remove tab', () => {
  const wrapper = mount(<App />);
  const tabsBeforeUpdate = wrapper.find('[data-test="tabBox"]');

  expect(tabsBeforeUpdate).toContainMatchingElements(5, 'li[data-test="tab-anchor"]');

  const tabRemoveButtons = tabsBeforeUpdate.find('button[data-test="tabRemove"]');
  tabRemoveButtons.last().simulate('click');
  const tabsAfterUpdate = wrapper.find('[data-test="tabBox"]');

  expect(tabsAfterUpdate).toContainMatchingElements(4, 'li[data-test="tab-anchor"]');
});
