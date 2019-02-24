import React from 'react';
import { mount } from 'enzyme';
import App from '../src/component/App';


const selectors = {
  tabsBox: 'div[data-test="tabBox"]',
  addTabBtn: 'button[data-test="addTab"]',
  removeTabBtn: 'button[data-test="tabRemove"]',
  tabs: 'li[data-test="tab-anchor"]',
};

const getPage = wrapper => ({
  getTabsBox: () => wrapper.find(selectors.tabsBox),
  getTabsNth: index => wrapper.find(selectors.tabs).at(index),
  getAddTabBtn: () => wrapper.find(selectors.addTabBtn),
  getRemoveTabBtn: () => wrapper.find(selectors.removeTabBtn),
});

test('snapshot testing to toggle tab', () => {
  const wrapper = mount(<App />);
  expect(wrapper.render()).toMatchSnapshot();

  const page = getPage(wrapper);
  const tab2 = page.getTabsNth(1);
  tab2.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});

test('toggle tab', () => {
  const wrapper = mount(<App />);
  const page = getPage(wrapper);
  const firstTab = page.getTabsNth(0);
  const secondTab = page.getTabsNth(1);

  expect(firstTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(secondTab).not.toHaveClassName('react-tabs__tab--selected');
});

test('toggle tab 2', () => {
  const wrapper = mount(<App />);
  const page = getPage(wrapper);
  page.getTabsNth(1).simulate('click');
  const firstTab = page.getTabsNth(0);
  const secondTab = page.getTabsNth(1);
  secondTab.simulate('click');

  expect(secondTab).toHaveClassName('react-tabs__tab react-tabs__tab--selected');
  expect(firstTab).not.toHaveClassName('react-tabs__tab--selected');
});

test('add new rab', () => {
  const wrapper = mount(<App />);
  const page = getPage(wrapper);
  const tabsBeforeUpdate = page.getTabsBox();
  expect(tabsBeforeUpdate).toContainMatchingElements(5, selectors.tabs);

  const buttonAdd = page.getAddTabBtn();
  buttonAdd.last().simulate('submit');
  const tabsAfterUpdate = page.getTabsBox();
  expect(tabsAfterUpdate).toContainMatchingElements(6, selectors.tabs);
});

it('remove tab', () => {
  const wrapper = mount(<App />);
  const page = getPage(wrapper);
  const tabsBeforeUpdate = page.getTabsBox();
  expect(tabsBeforeUpdate).toContainMatchingElements(5, selectors.tabs);

  const tabRemoveButtons = page.getRemoveTabBtn();
  tabRemoveButtons.last().simulate('click');
  const tabsAfterUpdate = page.getTabsBox();
  expect(tabsAfterUpdate).toContainMatchingElements(4, selectors.tabs);
});
