import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/store';
import jwt_decode from 'jwt-decode';
import {setCurrentUser, logoutUser} from './store/actions/authActions';
import setAuthToken from './utils/setAuthToken';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// import Page404 from './components/page-404/Page404';


// Check for token
const token = localStorage.jwtToken;
if(token) {
  // set the header auth
  setAuthToken(token);
  // decode token and get user info and exp
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    //  TODO: Clear user Profile

    // Redirect to login
    window.location.href = '/login';

  }

}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App ">
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
