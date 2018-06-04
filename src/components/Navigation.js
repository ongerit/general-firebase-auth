import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import SignOutButton from './SignOut';
import * as routes from '../constants/routes'

const Navigation = ({authUser}) =>
  <nav className="navbar container" aria-label="main navigation">
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </nav>

const NavigationAuth = () =>
  <ul className="navbar-start">
    {/* <li className="navbar-item"><Link to={routes.LANDING}>Landing</Link></li> */}
    <li className="navbar-item"><Link to={routes.HOME}>Access Device</Link></li>
    <li className="navbar-item"><Link to={routes.ACCOUNT}>Account</Link></li>
    <li className="navbar-item"><SignOutButton /></li>
  </ul>


const NavigationNonAuth = () =>
  <ul className="navbar-start">
    <li className="navbar-item"><Link to={routes.LANDING}>Landing</Link></li>
    <li className="navbar-item"><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});


export default connect(mapStateToProps)(Navigation);
