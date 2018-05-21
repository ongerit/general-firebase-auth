import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import Navigation from './Navigation'
import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOutButton from './SignOut'
import PasswordForget from './PasswordForget'
import Home from './Home'
import Account from './Account'

import * as routes from '../constants/routes'
import { firebase } from '../firebase';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
    <Router>
      <div>
      <Navigation authUser={this.state.authUser} />
        <hr />
        <Route
          exact path={routes.LANDING}
          component={() => <Landing />}
        />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUp />}
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForget />}
        />
        <Route
          exact path={routes.HOME}
          component={() => <Home />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignIn />}
        />
        <Route
          exact path={routes.SIGN_OUT}
          component={() => <SignOutButton />}
        />
        <Route
          exact path={routes.ACCOUNT}
          component={() => <Account />}
        />
      </div>
    </Router>
    );
  }
}

export default App;
