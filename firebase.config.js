import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCO7mxx1KBOu4Ym-XSiqTyF4pWdh5P7BPQ",
    authDomain: "hackathon-89866.firebaseapp.com",
    projectId: "hackathon-89866",
    storageBucket: "hackathon-89866.appspot.com",
    messagingSenderId: "712131505815",
    appId: "1:712131505815:web:1fb2d1ac29e835ac5f83d2"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getData(collection, docId) {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

export async function setData(collection, docId, data) {
    const docRef = doc(db, collection, docId);
    await setDoc(docRef, data, { merge: true });
}

export async function updateData(collection, docId, data) {
    const docRef = doc(db, collection, docId);
    const update = {};
    for (const key in data) {
        update[key] = arrayUnion(data[key]);
    }
    await updateDoc(docRef, update);
}

export default app;