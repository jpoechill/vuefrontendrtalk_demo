import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyA2oVKtcf-uG0uEtYF7SnJIYt7YuUA4xsM",
  authDomain: "xnews-visitor-counter.firebaseapp.com",
  databaseURL: "https://xnews-visitor-counter.firebaseio.com",
  projectId: "xnews-visitor-counter",
  storageBucket: "xnews-visitor-counter.appspot.com",
  messagingSenderId: "273060745261",
  appId: "1:273060745261:web:9576937cc4e44969"
};

let firebaseApp

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config)
} else {
  firebaseApp = firebase
}

let firestore = firebaseApp.firestore()

// firestore.settings({
//   timestampsInSnapshots: true
// });

export default {
  firestore
}