// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsAjis3mkxkk7vdLRM9FVMleJssM3QRVY",
  authDomain: "reservas-e7b7c.firebaseapp.com",
  projectId: "reservas-e7b7c",
  storageBucket: "reservas-e7b7c.appspot.com",
  messagingSenderId: "933770981474",
  appId: "1:933770981474:web:42a7e26829abeb9389213b",
  measurementId: "G-GPFSK5CRNN",
  databaseURL: "https://reservas-e7b7c-default-rtdb.firebaseio.com",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const database = getDatabase(app)
const storage = getStorage(app)

export { app, database, storage }
