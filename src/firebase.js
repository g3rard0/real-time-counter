import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAWTmf2Ts368C0Bck8fE0ES0vv_AaSZJ1U",
  authDomain: "real-time-counter.firebaseapp.com",
  databaseURL: "https://real-time-counter.firebaseio.com",
  projectId: "real-time-counter",
  storageBucket: "real-time-counter.appspot.com",
  messagingSenderId: "891832645108",
  appId: "1:891832645108:web:482e352680e7334f7535a1",
  measurementId: "G-WB8KSM6QMJ"
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;