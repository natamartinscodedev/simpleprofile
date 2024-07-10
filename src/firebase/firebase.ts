// firebase.js ou firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY || 'mock_key',
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock_key',
    projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID || 'mock_key',
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock_key',
    messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'mock_key',
    appId: process.env.PUBLIC_FIREBASE_APP_ID || 'mock_key',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
