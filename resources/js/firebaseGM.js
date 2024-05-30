import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaOQUIim8drumZwZtPgJ3hcm2_p6Q0fcM",
  authDomain: "myproject-gm.firebaseapp.com",
  projectId: "myproject-gm",
  storageBucket: "myproject-gm.appspot.com",
  messagingSenderId: "901705761053",
  appId: "1:901705761053:web:fcfe921ebe8cee594761f4",
  measurementId: "G-CZ4GP3K0KL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

async function getMembers() {
  const collect = await collection(db, `member`);
  const snapshot = await getDocs(collect);

  return snapshot;
  //   snabshot.forEach((doc) => {
  //     //   doc.data();
  //     console.log(doc.data());
  //     doc.data();
  //   });
}
export { db, getMembers };
