import React from 'react';
import uniqid from 'uniqid';
import Cookie from 'js-cookie';
import TabsConstructor from './TabsConstructor';
import debug from 'debug';

const stateLogger = debug('setState:');
export default context => {
  const setState = context.setState;
  context.setState = function(nextState, cb) {
    stateLogger('Name: ', context.constructor.name);
    stateLogger('Old state: ', context.state);
    setState.apply(context, [
      nextState,
      () => {
        if (typeof cb === 'function') cb();
        stateLogger('New state: ', context.state);
      },
    ]);
  };
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { textInput: 1, id: 1 },
        { textInput: 2, id: 2 },
        { textInput: 3, id: 3 },
        { textInput: 4, id: 4 },
        { textInput: 5, id: 5 }],
      contents: [
        { content: 'some text1', id: 1 },
        { content: 'some text2', id: 2 },
        { content: 'some text3', id: 3 },
        { content: 'some text4', id: 4 },
        { content: 'some text5', id: 5 },
      ],
      textInput: '',
      activeTabIndex: +Cookie.get('activeTabIndex') || 0,
    };
  }

  onChange = () => this.setState({ textInput: this.text.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { textInput, tabs, contents } = this.state;
    const id = uniqid();
    const newTabs = [...tabs, { textInput, id }];
    const newContents = [...contents, { content: 'some text', id }];
    this.setState({
      tabs: newTabs,
      contents: newContents,
      textInput: '',
    });
  }

  onRemove = currentId => () => {
    const { tabs, contents } = this.state;
    this.setState({
      tabs: tabs.filter(({ id }) => id !== currentId),
      contents: contents.filter(({ id }) => id !== currentId),
    });
  }

  selectTab = (activeTabIndex) => {
    this.setState({ activeTabIndex });
    Cookie.set('activeTabIndex', activeTabIndex);
  };

  render() {
    const {
      tabs, contents, textInput, activeTabIndex,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor='titleNewTab'>enter the name of new tab  </label>
          <input
            // eslint-disable-next-line no-return-assign
            ref={input => this.text = input}
            id='titleNewTab'
            onChange={this.onChange}
            placeholder="name"
            type="text"
            value={textInput}
          />
          <button type='submit' data-test='addTab'>add Tab</button>
          </form>
          <TabsConstructor
            tabs={tabs}
            contents={contents}
            onRemove={this.onRemove}
            activeTabIndex={activeTabIndex}
            selectTab={this.selectTab}
          />
      </div>
    );
  }
}
