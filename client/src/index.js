import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';


// Import Containers
import App from './containers/App';
import Account from './containers/Account';
import SignOut from "./containers/Signout";
import SignIn from "./containers/Login";
import Welcome from "./containers/WelcomePage";
import GroceryList from "./containers/GroceryList";
import GroceryOverview from "./containers/GroceryOverview";
import GroceryListEdit from "./containers/GroceryListEdit";
import Admin from "./containers/Admin"
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import Dashboard from './containers/Dashboard';

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
        <Route path="/" render = {App}/>
        <Route path="/dashboard" component = {Dashboard}/>
        <Route path='/home' component={Welcome}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signout' component={SignOut}/>
        <Route path="/go" component = {GroceryOverview}/>
        <Route path="/gl" component = {GroceryList}/>
        <Route path="/gle" component = {GroceryListEdit}/>
        <Route path="/account" component = {Account} />
        <Route path="/admin" component = {Admin}/>

    </Router>
  </Provider>
  , document.getElementById('root'));
