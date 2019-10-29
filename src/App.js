import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Profile from './profile';

import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index'

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) )  

class App extends Component {

  state = {
    loggedIn: false
  }

  loggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }
  render() {
    return (
      <Provider store={store}>
      <Switch>
        <Route exact path='/'
          render={routerProps => <Login {...routerProps} loggedIn={this.loggedIn} />} component={Login}
        />
        <Route exact path='/profile'
          render={routerProps => <login {...routerProps} />}
          component={Profile} />
      </Switch>
      </Provider>
    );

  }
}

export default App;
