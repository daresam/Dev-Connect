import React, { Component } from 'react';

import {Provider} from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="display-2"> Hello</h1>
      </div>
     
    );
  }
}

export default App;
