// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwn3LGR4IS5skszZ_RWq4b29XN2i4axkI",
  authDomain: "fir-react-upload-d7e7f.firebaseapp.com",
  projectId: "fir-react-upload-d7e7f",
  storageBucket: "fir-react-upload-d7e7f.appspot.com",
  messagingSenderId: "917745499755",
  appId: "1:917745499755:web:11ae00f979852204b5fb2e",
  measurementId: "G-JP31CWYLPV"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

const storage = getStorage (firebase);
export { storage, firebase as default };