import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDfE9DQuxMn_IFQeeNprf35iqMHPRuyrHc",
  authDomain: "course-platform-5490e.firebaseapp.com",
  databaseURL: "https://course-platform-5490e-default-rtdb.firebaseio.com",
  projectId: "course-platform-5490e",
  storageBucket: "course-platform-5490e.firebasestorage.app",
  messagingSenderId: "373927579763",
  appId: "1:373927579763:web:7a69f6c0074ca3da5a1a06"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app); 