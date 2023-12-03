const firebaseConfig = {
    apiKey: "AIzaSyAMP0vxS4Z0okn_xHuVLXnqSUMUM_1rDro",
    authDomain: "wlogin-4aa10.firebaseapp.com",
    databaseURL: "https://wlogin-4aa10-default-rtdb.firebaseio.com",
    projectId: "wlogin-4aa10",
    storageBucket: "wlogin-4aa10.appspot.com",
    messagingSenderId: "1042862838801",
    appId: "1:1042862838801:web:a3b552af9131d5b3808db0",
    measurementId: "G-0H986GY8W3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

