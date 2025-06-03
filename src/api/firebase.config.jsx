import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPD1Hu9kqnhm0DDMkCfyELhutQkDfylJ0",
  authDomain: "sistemaweb-dcyt.firebaseapp.com",
  projectId: "sistemaweb-dcyt",
  storageBucket: "sistemaweb-dcyt.appspot.com",
  messagingSenderId: "444804597804",
  appId: "1:444804597804:web:2749471fca5f98c19f6989"
};

const { app } = initializeApp(firebaseConfig);
export const auth = getAuth(app);