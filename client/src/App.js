import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Page404 from './components/page-404/Page404';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                {/* <Route  component={Page404} /> */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
      

    );
  }
}

export default App;
