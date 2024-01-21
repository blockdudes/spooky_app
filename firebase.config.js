

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


import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// // For more information on how to access Firebase in your project,
// // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// export const db = getFirestore(app);
// export default app;