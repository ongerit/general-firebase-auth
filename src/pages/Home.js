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
    const { users } = this.props

    return (
      <section className="section">
        <div className="container">
          <h2 className="title">NO DEVICE FOUND.</h2>
          <p>The Access Device Page is accessible by every signed in user.</p>

          {!!users && <UserList users={users} />}
        </div>
      </section>
    )
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}> {users[key].username}</div>
    )}
  </div>


const mapStateToProps = (state) => ({
  users: state.userState.users,
})

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
})
const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);