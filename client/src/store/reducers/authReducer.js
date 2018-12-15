import {SET_CURRENT_USER, GET_SUCCESS, LOGOUT_USER} from '../actions/types';
import { toast } from "react-toastify";
import isEmpty from '../../utils/isEmpty';

 const initialState = {
     auth: {
         isAuthenticated: false,
         user: {}
     }
 };

 export default function (state = initialState, action) {
    switch(action.type) {
        case GET_SUCCESS: 
            toast.success("User Registration was Successful!");
            return {
                ...state,
                user:  action.payload
            }
        case SET_CURRENT_USER: 
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case LOGOUT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload
            }
        }   
        default: 
            return state;

    }

 }