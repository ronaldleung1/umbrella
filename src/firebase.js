import firebase from 'firebase';
let firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "use-umbrella.firebaseapp.com",
  databaseURL: "https://use-umbrella-default-rtdb.firebaseio.com/",
  projectId: "use-umbrella",
  storageBucket: "use-umbrella.appspot.com",
  messagingSenderId: "419023960016",
  appId: "1:419023960016:web:20c50aba1c2fd44e33ebd5"
};
firebase.initializeApp(firebaseConfig);
export default firebase;