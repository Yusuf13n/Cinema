import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZ55s4exZ9JIPj8yEV5TqT53_5scGph_4",
  authDomain: "authorization-61e89.firebaseapp.com",
  projectId: "authorization-61e89",
  storageBucket: "authorization-61e89.firebasestorage.app",
  messagingSenderId: "152406053231",
  appId: "1:152406053231:web:b61bd06bcf96c70f15d89a",
  measurementId: "G-KTGDK4ESET"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспортируем объекты аутентификации и Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
