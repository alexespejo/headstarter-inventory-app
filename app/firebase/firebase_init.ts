// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
interface FirebaseConfig {
 apiKey: string;
 authDomain: string;
 projectId: string;
 storageBucket: string;
 messagingSenderId: string;
 appId: string;
}

const firebaseConfig: FirebaseConfig = {
 apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
 authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
 projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
 storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
 messagingSenderId: process.env
  .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
 appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);