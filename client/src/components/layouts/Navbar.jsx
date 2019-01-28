import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../store/actions/authActions';
import {withRouter} from 'react-router-dom';
import {clearCurrentProfile} from '../../store/actions/profileActions';

class Navbar extends Component {

  onClickLogout = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push('/login');
  }
    render() {
      const {isAuthenticated, user} = this.props.auth;
      const authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/post-feed">Post Feeds</Link>
          </li>
          <li className="nav-item">
           <a className="nav-link" style={{cursor: 'pointer'}} onClick={this.onClickLogout}>
            <img  src={user ? user.avatar : '' } className="rounded-circle" alt={user ? user.name : ''}
              style={{width: '25px', marginRight: '5px'}}/>
            Logout</a>
          </li>
        </ul>
      );
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      );
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <Link className="navbar-brand" to="/">DevConnect</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles"> Developers
                    </Link>
                  </li>
                </ul>
                {isAuthenticated ? authLinks : guestLinks}
                
              </div>
            </div>
          </nav>
        
        );
    }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProp, {logoutUser, clearCurrentProfile})(withRouter(Navbar));