import React, { Component } from 'react'
import { auth } from '../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
    event.preventDefault()
  }
  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === ''

    return (
      <div>
        <h4>Change Password</h4>
        <form onSubmit={this.onSubmit}>
          <input
            className="input field"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="New Password"
          />
          <input
            className="input field"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm New Password"
          />
          <button
            className="button is-primary field"
            disabled={isInvalid} type="submit">
            Reset My Password
        </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
}

export default PasswordChangeForm;
