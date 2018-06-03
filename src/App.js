import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"

// Components
import withAuthentication from './components/withAuthentication';
import Navigation from './components/Navigation'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignOutButton from './components/SignOut'
import PasswordForget from './components/PasswordForget'

// Pages
import Landing from './pages/Landing'
import Home from './pages/Home'
import Account from './pages/Account/Account'

import * as routes from './constants/routes'
import { firebase } from './firebase';

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

export default withAuthentication(App);
