import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCh9lo6AcO8k9UEIKzLFKoq9xZqXYBvMn8",
  authDomain: "foodlist-a7ea2.firebaseapp.com",
  projectId: "foodlist-a7ea2",
  storageBucket: "foodlist-a7ea2.appspot.com",
  messagingSenderId: "756021758981",
  appId: "1:756021758981:web:903fcb3c4316b7d3cd606c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  // return snapshot;
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

// async function getDatasOrderByLimit(collectionName, options) {
//   const { fieldName, limits } = options;
//   let q;
//   if (!options.lq) {
//     q = query(
//       getCollection(collectionName),
//       orderBy(fieldName, "desc"),
//       limit(limits)
//     );
//   } else {
//     q = query(
//       getCollection(collectionName),
//       orderBy(fieldName, "desc"),
//       startAfter(options.lq),
//       limit(limits)
//     );
//   }

//   const snapshot = await getDocs(q);
//   const resultData = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     docId: doc.id,
//   }));
//   return resultData;
// }
async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  const q = query(
    getCollection(collectionName),
    orderBy(fieldName, "desc"),
    limit(limits)
  );

  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // async function deleteDatas(collectionName, docId, ...args) {
  // (...args) --> 없어도 함수 실행가능, 여러 개를 기입하면 배열로 변환
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();
  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. 컬렉션에 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    // deleteDoc(삭제할 문서);
    return true;
  } catch (error) {
    return false;
  }
}

export { addDatas, getDatas, getDatasOrderByLimit };
