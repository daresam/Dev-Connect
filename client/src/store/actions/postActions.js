import axios from 'axios';
import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST,
    CLEAR_ERRORS
} from './types';

export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })) 
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));      

}

export const getPost = (id) => (dispatch) => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }));
}
export const getPosts = () => (dispatch) => {
    dispatch(setPostLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }));
}
export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/api/posts/${postId}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: postId
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}
export const addLike = (postId) => (dispatch) => {
    axios.post(`/api/posts/like/${postId}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}
export const removeLike = (postId) => (dispatch) => {
    axios.post(`/api/posts/unlike/${postId}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
      .post(`/api/posts/comment/${postId}`, commentData)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios
      .delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
function setPostLoading() {
   return {
       type: POST_LOADING
   } 
}
// Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
