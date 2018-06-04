import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from '../components/withAuthorization'
import { db } from '../firebase'

class Home extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    )
  }

  render() {
    const { users, authUser } = this.props
    const userId = authUser.uid
    console.log(users)
    return (
      <div className="container">
      {
        users[authUser.uid]
        ? <h1 className="title">Hi, {users[authUser.uid].username}</h1>
        : ''
      }
      {
        users[authUser.uid]
        ? <h2 className="subtitle">DEVICE NUMBER: {users[authUser.uid].device}</h2>
        : <h2 className="subtitle">NO DEVICE FOUND.</h2>
      }

        <p>The Access Device Page is accessible by every signed in user.</p>
        {!!users && <UserList users={users} />}
      </div>
    )
  }
}

const UserList = ({ users }) =>
  <div>
    <hr />
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>
    <p className="has-text-weight-bold">USERS</p>
      {Object.keys(users).map(key =>
        <p key={key}> {users[key].username}</p>
      )}
  </div>


const mapStateToProps = (state) => ({
  users: state.userState.users,
  authUser: { ...state.sessionState.authUser },
})

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
})
const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);