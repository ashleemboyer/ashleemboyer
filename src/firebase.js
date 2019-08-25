import firebase from "firebase/app";
import database from "firebase/database";

const config = {
  apiKey: "AIzaSyDXlk-TtYGwZImKx1zhxY0HZVrnZqwQaRk",
  authDomain: "ashleemboyer-2018.firebaseapp.com",
  databaseURL: "https://ashleemboyer-2018.firebaseio.com",
  projectId: "ashleemboyer-2018",
  storageBucket: "ashleemboyer-2018.appspot.com",
  messagingSenderId: "914984621421",
  appId: "1:914984621421:web:bb082abd000a9241",
};

let firebaseCache;

const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};

export const addSubscriber = subscriber => {
  const id = getFirebase()
    .database()
    .ref()
    .child("subscribers")
    .push().key;

  return getFirebase()
    .database()
    .ref("subscribers")
    .orderByChild("email")
    .equalTo(subscriber.email)
    .once("value")
    .then(snapshot => {
      return !!snapshot.val();
    })
    .then(userExists => {
      if (userExists) {
        return { success: false, reason: "User already exists." };
      }

      return getFirebase()
        .database()
        .ref()
        .child(`subscribers/${id}`)
        .update({
          id,
          ...subscriber,
        })
        .then(() => {
          return { success: true };
        })
        .catch(err => {
          return { success: false, error: err };
        });
    });
};
