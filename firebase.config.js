

// export async function getData(collection, docId) {
//     const docRef = doc(db, collection, docId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         return docSnap.data();
//     } else {
//         console.log("No such document!");
//     }
// }

// export async function setData(collection, docId, data) {
//     const docRef = doc(db, collection, docId);
//     await setDoc(docRef, data, { merge: true });
// }

// export async function updateData(collection, docId, data) {
//     const docRef = doc(db, collection, docId);
//     const update = {};
//     for (const key in data) {
//         update[key] = arrayUnion(data[key]);
//     }
//     await updateDoc(docRef, update);
// }


import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4uhFM9BzP1ww-I36w1CVKDW-2P5KUa60",
    authDomain: "goaave-755a2.firebaseapp.com",
    projectId: "goaave-755a2",
    storageBucket: "goaave-755a2.appspot.com",
    messagingSenderId: "15933041933",
    appId: "1:15933041933:web:3eff9d3fdc23b2dfe5d444"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


export const db = getFirestore(app);
export default app;