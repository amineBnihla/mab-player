import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD273_Gu5pTGNQa7OLkF43qLHrk1XeSVo",
  authDomain: "vue-a7647.firebaseapp.com",
  projectId: "vue-a7647",
  storageBucket: "vue-a7647.appspot.com",
  messagingSenderId: "49265593263",
  appId: "1:49265593263:web:736005fce8221f34457d5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app)

export {
    db,
    storage,
    auth
}
