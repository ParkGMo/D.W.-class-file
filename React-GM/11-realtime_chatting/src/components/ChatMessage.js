import React from "react";
import tempImg from "../assets/ralo-profile.png";

function ChatMessage({ message, auth }) {
  const user = auth?.currentUser.uid;
  const { photoUrl, text, uid } = message;
  const messageClass = uid === user ? "sent" : "received";
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoUrl} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
