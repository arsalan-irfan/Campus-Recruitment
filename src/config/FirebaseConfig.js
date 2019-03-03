import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyBpYBQo9-z0uI_4HBGxH1HmpFVnyt7IBRU",
    authDomain: "campus-recruitment-8abf9.firebaseapp.com",
    databaseURL: "https://campus-recruitment-8abf9.firebaseio.com",
    projectId: "campus-recruitment-8abf9",
    storageBucket: "campus-recruitment-8abf9.appspot.com",
    messagingSenderId: "694910982531"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();