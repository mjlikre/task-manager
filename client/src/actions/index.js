import { INCREMENT_COUNTER, DECREMENT_COUNTER, AUTH_USER, AUTH_ERROR } from "./types";
import axios from 'axios';


export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};


export const signup = (data, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signup', data);
    console.log("got here")
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem('token', res.data.token);
    callback()
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: null
  };
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formProps);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};


export const test = async () => {

  try{
    const res = await axios.get("/api/test", { headers: { authorization: localStorage.getItem("token")}})
    console.log(res.data)
  }catch(e){
    console.log(e)
  }
}
