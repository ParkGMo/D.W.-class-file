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
  apiKey: "AIzaSyCJtntIKLytLGdJblTmqsbQvUUHbpGULcw",
  authDomain: "foodlist02.firebaseapp.com",
  projectId: "foodlist02",
  storageBucket: "foodlist02.appspot.com",
  messagingSenderId: "789185922817",
  appId: "1:789185922817:web:a38e2fd6dcbc5cf4063d00",
  measurementId: "G-3N2VCH6PK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);

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
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;

  // // 컬렉션에 저장
  // await addDoc(getCollection(collectionName), addObj);
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
  // 스토리이지에 있는 이미지를 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일 url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;
  try {
    // 삭제할 파일의 참조객체 생성(ref 함수 사용)
    const deleteRef = ref(storage, imgUrl);
    message = "이미지 삭제에 실패했습니다. \n 관리자에게 문의하세요!";
    // 파일 삭제
    await deleteObject(deleteRef);
    // database에 있는 문서 삭제
    message = "문서 삭제에 실패했습니다. \n 관리자에게 문의하세요!";
    const deleteDocRef = await doc(db, collectionName, docId);
    await deleteDoc(deleteDocRef);
    // deleteDoc(삭제할 문서);
    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

export { addDatas, getDatas, getDatasOrderByLimit, deleteDatas };
