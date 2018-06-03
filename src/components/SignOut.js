import React from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    class="button is-success"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;