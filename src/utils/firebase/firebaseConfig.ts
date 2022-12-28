import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDprSC81o05E8_4bEksz9cHjtmRyUhq7zw",
  authDomain: "fshare-vip.firebaseapp.com",
  projectId: "fshare-vip",
  storageBucket: "fshare-vip.appspot.com",
  messagingSenderId: "500784455567",
  appId: "1:500784455567:web:e299140348e495d283b5fa",
  databaseURL: "https://fshare-vip-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
