import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

// Import Containers
import App from './containers/App';
import Signup from './containers/Signup';
import Tasks from "./containers/Tasks"
import SignOut from "./containers/Signout"
import SignIn from "./containers/Login"
import 'bootstrap/dist/css/bootstrap.min.css'

// Import components
import Welcome from './components/Welcome';
import reducers from './reducers';

// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token')}
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Welcome}/>
        <Route exact path='/signin' component={SignIn}/>
        <Route exact path='/signout' component={SignOut}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path="/tasks" component = {Tasks}/>
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'));
