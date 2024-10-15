// firebase.js ou firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock_key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock_key',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock_key',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock_key',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'mock_key',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'mock_key',
  measurementId: process.env.NEXT_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log('Firebase ON!', auth)

export { auth }
