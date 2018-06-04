import React, { Component } from 'react'
import {
  Link,
  withRouter,
} from 'react-router-dom'
import * as routes from '../constants/routes'
import { auth, db } from '../firebase'

const SignUp = ({ history }) =>
  <div>
    <h1 className="title">Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  device: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    // event.preventDefault()
    const {
      username,
      email,
      device,
      passwordOne,
    } = this.state

    const {
      history,
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email, device)
          .then((data) => {
            console.log(data)
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
    event.preventDefault()
  }

  render() {
    const {
      username,
      email,
      device,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      device === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="input field"
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          className="input field"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          className="input field"
          value={device}
          onChange={event => this.setState(byPropKey('device', event.target.value))}
          type="text"
          placeholder="Device Number"
        />
        <input
          className="input field"
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          className="input field"
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="button is-primary field"
          disabled={isInvalid} 
          type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}

      </form>
    )
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUp)
export {
  SignUpForm,
  SignUpLink,
}