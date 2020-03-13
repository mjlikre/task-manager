import { AUTH_USER, AUTH_ERROR, TASKS, TASKS_ERROR } from "./types";
import axios from 'axios';

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
    const res = await axios.post('/api/auth/signin', formProps);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};


export const test = () => async dispatch =>  {

  try{
    await axios.get("/api/test", { headers: { authorization: localStorage.getItem("token")}})
  }catch(e){
    console.log(e)
  }
}

export const addTask = (formProps, callback) => async dispatch => {
  try{
    const res = await axios.post("api/tasks/add", formProps, { headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: TASKS, payload: res.data.data })
    callback()
  }catch(e){
    dispatch({ type: TASKS_ERROR, payload: 'An error occured' });
  }
}

export const importTask = (callback) => async dispatch => {
  try{
    const res = await axios.get("api/tasks/get", { headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: TASKS, payload: res.data.data })
    callback()
  }catch(e) {
    dispatch({ type: TASKS_ERROR, payload: "An error occured" })
  }
}