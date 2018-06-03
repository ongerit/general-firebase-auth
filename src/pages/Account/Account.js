import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { PasswordForgetForm } from '../../components/PasswordForget'
import PasswordChangeForm from '../../components/PasswordChange'
import withAuthorization from '../../components/withAuthorization'

const Account = ({ authUser }) =>
  <div>
    <h4>Account: {authUser.email}</h4>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Account)
