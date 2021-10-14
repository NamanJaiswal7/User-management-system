import firebase from "firebase/compat/app";
import auth2 from "firebase/compat/auth";
import { getFirestore, collection } from "firebase/firestore";
import storage1 from "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB-MFrCBwtVMNjK9r6CenBgmA0pU3V_-zs",
  authDomain: "admin-panel-a20dc.firebaseapp.com",
  databaseURL: "https://admin-panel-a20dc-default-rtdb.firebaseio.com",
  projectId: "admin-panel-a20dc",
  storageBucket: "admin-panel-a20dc.appspot.com",
  messagingSenderId: "452625993480",
  appId: "1:452625993480:web:1677c49c692bfebed4a6bd",
  measurementId: "G-XMT69R0N5W"
});
export const auth = app.auth();
export default app;
export const storage = firebase.storage();
export const firestore = getFirestore(app);
// console.log(firestore)
export const database = {
  users: collection(firestore, "users")
  // getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
};
