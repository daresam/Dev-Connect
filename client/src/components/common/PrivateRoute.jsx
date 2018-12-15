import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

// https://tylermcginnis.com/react-router-protected-routes-authentication/

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route 
        {...rest} 
        render = {props => 
            auth.isAuthenticated === true ? 
            (<Component {...props} /> ) : 
            (<Redirect to='/login' />)  
            
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);