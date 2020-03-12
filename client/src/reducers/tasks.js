import { TASKS, TASKS_ERROR } from './../actions/types'

const INITIAL_STATE = {
    tasks: '',
    task_error: ''
  };
  
  export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case TASKS:
        return { ...state, tasks: action.payload };
      case TASKS_ERROR:
        return { ...state, tasks_error: action.payload };
      default:
        return state;
    }
  }
  