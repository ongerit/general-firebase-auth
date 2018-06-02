import {auth} from './firebase'
// Sign up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
}

// Sign in
export const doSignInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
}

// Sign Out
export const doSignOut = () => {
  return auth.signOut()
}

// Password Reset
export const doPasswordUpdate = (password) => {
  return auth.currentUser.updatePassword(password)
}
