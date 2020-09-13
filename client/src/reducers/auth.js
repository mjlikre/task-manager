import { AUTH_USER, AUTH_ERROR, GET_USER_NAME, GET_USER_NAME_ERROR } from "../actions/types";
import { StaticRouter } from "react-router-dom";

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  username: "",
  usernameError: ""
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_USER_NAME: 
      return {...state, username: action.payload};
    case GET_USER_NAME_ERROR: 
      return {...state, usernameError: action.payload}
    default:
      return state;
  }
}
