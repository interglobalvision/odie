import { createStore, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebae configuration
const firebaseConfig = {
  apiKey: "AIzaSyB52tWbT-HNEDVk0xUAWxEgWrhxojm-hOw",
  authDomain: "odie-dev.firebaseapp.com",
  databaseURL: "https://odie-dev.firebaseio.com",
  projectId: "odie-dev",
  storageBucket: "",
  messagingSenderId: "627030374823"
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase config
const reduxFirebaseConfig = {
  userProfile: 'users',
  // enableLogging: true, // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, reduxFirebaseConfig),
)(createStore)
