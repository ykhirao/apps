// import firebase from 'firebase'
import * as firebase from 'firebase'

if (!firebase.apps.length && process) {
  const {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  } = process.env

  const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  }

  firebase.initializeApp(firebaseConfig)
  if (firebase.analytics) firebase.analytics()
}

export default firebase
