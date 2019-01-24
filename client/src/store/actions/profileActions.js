import { GET_PROFILE, PROFILE_LOADING,
        CLEAR_CURRENT_PROFILE,
        GET_ERRORS, GET_SUCCESS,
        SET_CURRENT_USER, GET_PROFILES
        } from './types';
import axios from 'axios'; 

// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }))
}
// Get All Profiles
export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/profiles')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: {}
        }))
}

export const deleteMyAccount = () => (dispatch) => {
    if(window.confirm('are you sure? This can not be UNDONE!!')){
        axios.delete('/api/profile')
            .then(
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));

    }
}


//  Clear Current Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

// Create Profile
export const  createProfile = (profileData, history) => (dispatch) => {
    axios
        .post('/api/profile', profileData)
        .then(res => {
            dispatch({type: GET_SUCCESS, payload: res.data});
            history.push('/dashboard');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}



// Add Experience
export const addExperience = (experienceData, history) => (dispatch) => {
    axios
        .post('/api/profile/experience', experienceData)
        .then(res => {
            dispatch({type: GET_SUCCESS, payload: res.data});
            history.push('/dashboard');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
// Delete Experience
export const deleteExperience = (id) => (dispatch) => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({type: GET_PROFILE, payload: res.data}))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

} 

// Add Education
export const addEducation = (educationData, history) => (dispatch) => {
    axios
        .post('/api/profile/education', educationData)
        .then(res => {
            dispatch({type: GET_SUCCESS, payload: res.data});
            history.push('/dashboard');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Delete Education
 export const deleteEducation = (id) => (dispatch) => {
     axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch({type: GET_PROFILE, payload: res.data}))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
 }