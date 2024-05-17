import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase();
