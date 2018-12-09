import {GET_ERRORS, GET_SUCCESS, SET_CURRENT_USER, LOGOUT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';


export const registerUser = (userData, history) => (dispatch) => {
   axios.post('/api/users/register', userData)
        .then(res => { 
            dispatch({type: GET_SUCCESS, payload: {}});
            history.push('/login');      
            
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const userLogin = (userData) => (dispatch) => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Store Token into localstorage
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            // Set Authorization
            setAuthToken(token);
            // Decode Token
            const decoded = jwtDecode(token);
            // Set Current User
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            
        }))

}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => (dispatch) => {
    // remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    });
}