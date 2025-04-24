// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB71p6sLhzAJKuHiE3zGvn300mpixlQqJU",
  authDomain: "auto-bodyshop.firebaseapp.com",
  projectId: "auto-bodyshop",
  storageBucket: "auto-bodyshop.firebasestorage.app",
  messagingSenderId: "261954757136",
  appId: "1:261954757136:web:f101af10c9b86dbe4e2095",
  measurementId: "G-WJNR3K5JJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const analytics = getAnalytics(app);