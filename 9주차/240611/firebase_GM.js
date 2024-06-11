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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
  try {
    await db.collection(collectionName).doc(docId).update(updateObj);
    return true;
  } catch (error) {
    return false;
  }
}
