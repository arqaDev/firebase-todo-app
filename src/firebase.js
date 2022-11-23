import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "react-todo-app-949f4.firebaseapp.com",
    projectId: "react-todo-app-949f4",
    storageBucket: "react-todo-app-949f4.appspot.com",
    messagingSenderId: "826932584026",
    appId: "1:826932584026:web:5eb77c6d5ff11274a68263"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)