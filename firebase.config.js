import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyBxCtrOr2nqgeEi4mBlt-Scumn_4zv7MYk",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://universities-5bc20-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase();
