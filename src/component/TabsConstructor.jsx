import React from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import _ from 'lodash';


const TabsConstructor = (props) => {
  const { tabs, contents, onRemove } = props;
  return (
    <div data-test="tabBox">
      <Tabs>
        <TabList>
          {tabs.map(({ textInput, id }) => <Tab data-test="tab-anchor" key={_.uniqueId()} data-id={id}> {textInput}<button onClick={onRemove(id)} data-test="tabRemove"> x </button></Tab>)}
        </TabList>
        {contents.map(({ content, id }) => (
          <TabPanel key={_.uniqueId()} data-id={id}>
            <h2>{content}</h2>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsConstructor;
