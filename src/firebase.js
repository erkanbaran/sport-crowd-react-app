import * as firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyB8p027UeS2iTLc3prJImKSY2IJhLRvAkI",
    authDomain: "sport-crowd.firebaseapp.com",
    databaseURL: "https://sport-crowd.firebaseio.com",
    projectId: "sport-crowd",
    storageBucket: "sport-crowd.appspot.com",
    messagingSenderId: "55644962133",
    appId: "1:55644962133:web:b6f3e50559243893"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const FirebaseArticles = firebaseDB.ref('articles');
const FirebaseTeams = firebaseDB.ref('teams');
const FirebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}

export{
    firebaseDB,
    FirebaseArticles,
    FirebaseTeams,
    FirebaseVideos,
    firebaseLooper
}