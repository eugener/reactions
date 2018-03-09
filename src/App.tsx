import * as React from 'react';
import './App.css';
import { ActionTools } from './action/ActionTools';
import { Action, ActionGroup } from './action/Action';

const logo = require('./logo.svg');
const action1 = new Action('Action 1', 'edit', 'Action 1 Description');
const action2 = new Action(
  'Action 2',
  'cloud', 
  'Action 2 Description', 
  () => { 
    action1.enabled = !(action1.enabled); 
  } 
);
const action3 = new ActionGroup( 
  'Action 3',
  'cloud-o', 
  'Action 3 Description', 
  action1, action2
);

class App extends React.Component {
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
        {ActionTools.toButton(action1)}
        {ActionTools.toButton(action2)}
        {ActionTools.toButton(action3)}
      </div>
    );
  }
}

export default App;
