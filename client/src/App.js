import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" Component={Landing} />
          <Footer />
        </div>
      </Router>

    );
  }
}

export default App;
