import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        // Apply  every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;