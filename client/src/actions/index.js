import {
  AUTH_USER,
  AUTH_ERROR,
  TASKS,
  TASKS_ERROR,
  NEW_GROCERY,
  NEW_GROCERY_ERROR,
  GET_ALL_GROCERY,
  GET_ALL_GROCERY_ERROR,
  DELETE_GROCERY_ITEM_ERROR,
  GET_ONE_GROCERY_LIST_ERROR,
  GET_ONE_GROCERY_LIST,
  ADD_NEW_ITEM_ERROR,
  GROCERY_ITEM_LIST,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_ERROR,
  COST_SPLIT_ERROR,
  COST_SPLIT,
  GET_ALL_COST_SPLIT,
  GET_ALL_COST_SPLIT_ERROR,
  GET_ONE_GROCERY_OVERVIEW, 
  GET_ONE_GROCERY_OVERVIEW_ERROR
} from "./types";
import axios from "axios";

// export const signup = (data, callback) => async (dispatch) => {
//   try {
//     const res = await axios.post("/api/auth/signup", data);
//     console.log("got here");
//     dispatch({ type: AUTH_USER, payload: res.data.token });
//     localStorage.setItem("token", res.data.token);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, payload: "Email in use" });
//   }
// };

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: null,
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signin", formProps);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};
export const changePass = (formProps, callback) => async (dispatch) => {
  try{
    const res = await axios.post("/api/auth/edit", formProps); 
    callback()
  }catch(e) {
    console.log(e)
  }
}
export const test = () => async (dispatch) => {
  try {
    await axios.get("/api/test", {
      headers: { authorization: localStorage.getItem("token") },
    });
  } catch (e) {
    console.log(e);
  }
};

export const addTask = (formProps, callback) => async (dispatch) => {
  try {
    const res = await axios.post("api/tasks/add", formProps, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: TASKS, payload: res.data.data });
    callback();
  } catch (e) {
    dispatch({ type: TASKS_ERROR, payload: "An error occured" });
  }
};

export const importTask = (callback) => async (dispatch) => {
  try {
    const res = await axios.get("api/tasks/get", {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: TASKS, payload: res.data.data });
    callback();
  } catch (e) {
    dispatch({ type: TASKS_ERROR, payload: "An error occured" });
  }
};

export const createNewGroceryList = (formProps, callback) => async (
  dispatch
) => {
  try {
    const res = await axios.post("api/grocery/new_gl", formProps, {headers: { authorization: localStorage.getItem("token")}});
    dispatch({ type: NEW_GROCERY, payload: res.data.data });
    await callback();
  } catch (e) {
    dispatch({ type: NEW_GROCERY_ERROR, payload: "error" });
  }
};

export const getAllGroceryList = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("api/grocery/getall", {status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}});
    dispatch({ type: GET_ALL_GROCERY, payload: res.data.data });
    await callback();
  } catch (e) {
    console.log(e)
    dispatch({ type: GET_ALL_GROCERY_ERROR, payload: "couldn't pull all grocery list"  });
  }
};

export const getSingleGroceryList = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("api/grocery/getlist", {id: data},  {headers: { authorization: localStorage.getItem("token")}});
    dispatch({ type: GET_ONE_GROCERY_LIST, payload: res.data.data });
    await callback();
  } catch (e) {
    dispatch({ type: GET_ONE_GROCERY_LIST_ERROR, payload: "couldn't get single grocery list that was requested"  });
  }
};

export const getGroceryList = (data, callback) => async (dispatch) => {
  try{
    const res = await axios.post("api/grocery/get_list", data, {headers: { authorization: localStorage.getItem("token")}})
    dispatch({type: GET_ONE_GROCERY_OVERVIEW, payload: res.data.data})
    await callback()
    
  }catch(e){
    console.log(e)
    dispatch({type: GET_ONE_GROCERY_OVERVIEW_ERROR, payload: "error" })
  }
}

export const deleteGroceryList = (id, callback) => async (dispatch) => {
  try {
    const res = await axios.post("api/grocery/delete_list", id);
    dispatch({ type: GET_ALL_GROCERY, payload: res.data.data });
    await callback();
  } catch (e) {
    dispatch({ type: DELETE_GROCERY_ITEM_ERROR, payload: "couldn't delete this grocery list"  });
  }
};

export const addNewItem = (formProps, callback) => async (dispatch) => {
  try{
    const res = await axios.post("api/grocery/new_item", formProps,  {headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: GROCERY_ITEM_LIST, payload: res.data.data})
    await callback()
  }catch(e) {
    console.log(e)
    dispatch({ type: ADD_NEW_ITEM_ERROR, payload: e})

  }
}; 

export const updateItem = (formProps, callback) => async (dispatch) => {
  try{
    const res = await axios.post("api/grocery/update_item", formProps,  {headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: GROCERY_ITEM_LIST, payload: res.data.data})
    await callback()
  }catch(e) {
    dispatch({ type: UPDATE_ITEM_ERROR, payload: e})

  }
}
export const deleteItem = (formProps, callback) => async (dispatch) => {
  try{
    const res = await axios.post("api/grocery/delete_item", formProps,  {headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: GROCERY_ITEM_LIST, payload: res.data.data})
    await callback()
  }catch(e) {
    dispatch({ type: DELETE_ITEM_ERROR, payload: e})
  }
}

export const createCostSplit = (data, callback) => async (dispatch) => {
  try{
    console.log(data)
    const res = await axios.post("api/grocery/new_split", {id: data})
    dispatch({ type: COST_SPLIT, payload: res.data.data})
    await callback()
  }catch(e) {
    dispatch({ type: COST_SPLIT_ERROR, payload: e})

  }
}

export const updateCostSplist = (formProps, callback) => async (dispatch) => {
  try{
    const res = await axios.post("api/grocery/update_split", formProps)
    dispatch({ type: COST_SPLIT, payload: res.data.data})
    await callback()

  }catch(e) {
    dispatch({ type: COST_SPLIT_ERROR, payload: e})
  }
}

export const getCostSplit = (id, callback) => async(dispatch) => {
  try{
    const res = await axios.post("/api/grocery/get_split", {id: id}, {headers: { authorization: localStorage.getItem("token")}})
    dispatch({ type: COST_SPLIT, payload: res.data.data})
    await callback()
  }catch(e) {
    console.log(e, "actions")
    dispatch({ type: COST_SPLIT_ERROR, payload: e})
  }
}

export const GetAllCostSplit = (callback) => async(dispatch) => {
  try{
    const res = await axios.post("/api/grocery/get_all_split",{status: "getting it"}, {headers: {authorization: localStorage.getItem("token")}})
    dispatch({type: GET_ALL_COST_SPLIT, payload: res.data.data})
    await callback()
  }catch(e) {
    console.log(e, "can't get all data")
    dispatch({type: GET_ALL_COST_SPLIT_ERROR, payload: e})
  }
}
