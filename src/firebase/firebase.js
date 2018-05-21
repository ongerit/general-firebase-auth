import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

// import * as firebase from 'firebase';

const  config = {
//[TO] Added config here
}

if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
 auth,
}