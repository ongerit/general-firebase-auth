import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase'
import * as routes from '../constants/routes'

const SignIn = ({ history }) =>
  <div>
    <h1>Sign In Page</h1>
    <SignInForm history={history} />
    <SignUpLink />
    <PasswordForgetLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state

    const isInvalid =
      password === '' ||
      email === ''

    return (
          <form 
          onSubmit={this.onSubmit}>
            <input
              className="input field"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
            <input
              className="input field"
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />
            <button
              className="button is-primary field"
              disabled={isInvalid}
              type="submit">
              Sign In
        </button>

            {error && <p>{error.message}</p>}
          </form>
    )
  }
}

export default withRouter(SignIn)

export {
  SignInForm,
}