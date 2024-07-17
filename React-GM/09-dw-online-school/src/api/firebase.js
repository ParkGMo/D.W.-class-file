import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMU-m-fRuTcbblqbw6H7Ni9c3BgB77Lyc",
  authDomain: "dwos-c51de.firebaseapp.com",
  projectId: "dwos-c51de",
  storageBucket: "dwos-c51de.appspot.com",
  messagingSenderId: "739406921572",
  appId: "1:739406921572:web:714c0c09cb9873a0464471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

export { db, getDatas };
