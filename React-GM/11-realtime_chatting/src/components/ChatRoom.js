import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  addDatas,
  db,
  getQuery,
  getRealTimeMessages,
} from "../api/firebase_GM";
import { ref } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState("");
  // const [messages, setMessages] = useState([]);
  const conditions = [];
  const orderBys = [{ field: "createdAt", direction: "asc" }];
  const LIMITS = 100;
  const q = getQuery("message", {
    conditions,
    orderBys,
    limit: LIMITS,
  });
  const [messages] = useCollectionData(q);
  const dummy = useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    // 저장할 데이터 객체를 생성한다. {text, createdAt, photoUrl, uid}
    const { photoURL, uid } = auth?.currentUser;

    const addObj = {
      text: inputValue,
      createdAt: serverTimestamp(),
      photoUrl: photoURL,
      uid: uid,
    };

    // 데이터베이스에 객체를 저장한다.
    addDatas("message", addObj);

    // inputValue 를 빈 문자열로 셋팅한다.
    setInputValue("");
  };
  useEffect(() => {
    /*
    const collect = collection(db, "message");
    const q = query(collect, orderBy("createdAt"), limit(100));
    // onSnapshot은 구독을 취소하는 역할을 하여 서버의 과부화를 막는다.
    // collection의 변경이 있으면 getDocs를 실행한다.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resultData = snapshot.docs.map((doc) => doc.data());
      setMessages(resultData);
    });
    return () => {
      unsubscribe();
    };*/
    // const unsubscribe = getRealTimeMessages("message", setMessages);
    // return () => {
    //   unsubscribe();
    // };
  }, []);
  useEffect(() => {
    // scrollIntoView() 함수는 자신이 호출된 요소가 사용자에게 표시되도록
    // 상위 컨테이너를 스크롤한다.
    // () --> boolean과 속성 중 하나만 작성 가능 , boolean -> false는 젤밑 / true는 젤위
    // dummy.current.scrollIntoView({ behavior: "smooth",block : "start, center, end, nearest"});
    dummy.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  return (
    <>
      <main>
        {messages?.map((message, idx) => {
          return <ChatMessage message={message} key={idx} auth={auth} />;
        })}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" disabled={!inputValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
