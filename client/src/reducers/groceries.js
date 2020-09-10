import {
  GET_ALL_GROCERY,
  GET_ALL_GROCERY_ERROR,
  NEW_GROCERY,
  NEW_GROCERY_ERROR,
  DELETE_GROCERY_ITEM_ERROR,
  GET_ONE_GROCERY_LIST,
  GET_ONE_GROCERY_LIST_ERROR,
  GROCERY_ITEM_LIST,
  ADD_NEW_ITEM_ERROR,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_ERROR,
  COST_SPLIT,
  COST_SPLIT_ERROR,
  GET_ALL_COST_SPLIT,
  GET_ALL_COST_SPLIT_ERROR,
  GET_ONE_GROCERY_OVERVIEW,
  GET_ONE_GROCERY_OVERVIEW_ERROR,
  GET_TOTAL_BALANCE,
  GET_TOTAL_BALANCE_ERROR
} from "./../actions/types";

const INITIAL_STATE = {
  newGrocery: "",
  newGroceryError: "",
  allGrocery: [],
  oneGrocery: [],
  oneGroceryError: "",
  allGroceryError: "",
  deleteGroceryError: "",
  addNewItemError: "",
  updateItemError: "",
  deleteItemError: "",
  costSplit: [],
  costSplitError: "",
  allCostSplit: [],
  allCostSplitError: "",
  getOneGroceryOverview: "",
  getOneGroceryOverviewError: "",
  totalBalance: "",
  totalBalanceError: ""

};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_GROCERY:
      return { ...state, newGrocery: action.payload };
    case NEW_GROCERY_ERROR:
      return { ...state, newGroceryError: action.payload };
    case GET_ALL_GROCERY:
      return { ...state, allGrocery: action.payload };
    case GET_ALL_GROCERY_ERROR:
      return { ...state, allGroceryError: action.payload };
    case DELETE_GROCERY_ITEM_ERROR: 
        return { ...state, deleteGroceryError: action.payload };
    case GET_ONE_GROCERY_LIST:
      return {...state, oneGrocery: action.payload};
    case GET_ONE_GROCERY_LIST_ERROR: 
      return {...state, oneGroceryError: action.payload};
    case GROCERY_ITEM_LIST: 
      return {...state, oneGrocery: action.payload}
    case ADD_NEW_ITEM_ERROR: 
      return {...state, addNewItemError: action.payload}
    case UPDATE_ITEM_ERROR: 
      return {...state, updateItemError: action.payload}
    case DELETE_ITEM_ERROR: 
      return {...state, deleteItemError: action.payload}
    case COST_SPLIT: 
      return {...state, costSplit: action.payload}
    case COST_SPLIT_ERROR: 
      return {...state, costSplitError: action.payload}
    case GET_ALL_COST_SPLIT: 
      return {...state, allCostSplit: action.payload}
    case GET_ALL_COST_SPLIT_ERROR:
      return {...state, allCostSplitError: action.payload}
    case GET_ONE_GROCERY_OVERVIEW: 
      return {...state, getOneGroceryOverview: action.payload}
    case GET_ONE_GROCERY_OVERVIEW_ERROR: 
      return {...state, getOneGroceryOverviewError: action.paylod}
    case GET_TOTAL_BALANCE: 
      return {...state, totalBalance: action.payload}
    case GET_TOTAL_BALANCE_ERROR: 
      return {...state, totalBalanceError: action.payload}
    default:
      return state;
  }
}
