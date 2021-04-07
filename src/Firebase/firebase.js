import firebase from "firebase/app";
import "firebase/auth";

// Firebase web config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPGqymSosz9kq5E6ezWeOfWwFwfcbUXnY",
  authDomain: "xml-converter-c74c5.firebaseapp.com",
  databaseURL: "https://xml-converter-c74c5-default-rtdb.firebaseio.com",
  projectId: "xml-converter-c74c5",
  storageBucket: "xml-converter-c74c5.appspot.com",
  messagingSenderId: "172493909163",
  appId: "1:172493909163:web:63a240699c4d6e900f9bee",
  measurementId: "G-8W0MEJBH58"
};

let instance = null;
export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(config);
    return instance;
  }

  return null;
}
