import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, device) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    device,
    role: 'user',
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...