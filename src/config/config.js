import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyARW4S_s0LQAjP3V2KUbzdWZNukpxhULII",
    authDomain: "social-media-project-6c66c.firebaseapp.com",
    projectId: "social-media-project-6c66c",
    storageBucket: "social-media-project-6c66c.appspot.com",
    messagingSenderId: "490660258362",
    appId: "1:490660258362:web:885c2e14f4534466148b03"
  }

  // initialize firebase
  firebase.initializeApp(firebaseConfig)

  // initialize services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  // timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }