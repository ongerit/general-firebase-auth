import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

// import { PasswordForgetForm } from '../../components/PasswordForget'
import PasswordChangeForm from '../../components/PasswordChange'
import withAuthorization from '../../components/withAuthorization'

const Account = ({ authUser }) =>
  <div className="container is-fluid">
    <h4 className="title">Account</h4>
    <p className="subtitle">
    {authUser.email}</p>
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
