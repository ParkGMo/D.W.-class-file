import React, { useEffect, useState } from "react";
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
import { addDatas, db } from "../api/firebase_GM";

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
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
    const collect = collection(db, "message");
    const q = query(collect, orderBy("createdAt"), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs);
      // snapshot.forEach((doc) => {
      //   setMessages(doc.data());
      // });
    });
  }, []);
  return (
    <>
      <main>
        <ChatMessage messages={messages} />
        {/* <div>
          <img />
          <p>채팅내용</p>
        </div> */}
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
