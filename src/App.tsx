import * as React from 'react';
import './App.css';
import { Action, ActionGroup } from './action/Action';
import Notificaiton from 'antd/lib/notification';
import Icon from 'antd/lib/icon';
import { Toolbar } from './control/Toolbar';

const logo = require('./logo.svg');

class App extends React.Component {

  action1 = new Action('Refresh', 'sync', 'Refreshe the data');
  action2 = new Action(
      'New', 
      'plus-circle-o', 
      'Create new currency',
      () => { this.action1.enabled = !(this.action1.enabled); }
  );

  actions: Array<Action> = [
    this.action1,
    this.action2,
    new Action('Edit', 'edit', 'Edit selected currency', this.notify),
    new Action('Delete', 'close-circle-o', 'Delete selected currency', this.notify),
    new ActionGroup('Group', 'cloud', 'Action Group', this.action1, this.action2 ),
    // new RadioActionGroup( 
    //    new SelectableAction('radio 1'),
    //    new SelectableAction('radio 2')
    // )
  ];

  notify(): void {
    Notificaiton.open({
      icon: <Icon type="info-o" />,
      message: 'Notification',
      description: 'Action executed',
      duration: 3,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Toolbar iconOnly={false} actions={this.actions} />
      </div>
    );
  }
}

export default App;
