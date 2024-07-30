import React from "react";
import tempImg from "../assets/ralo-profile.png";

function ChatMessage({ message, auth }) {
  const user = auth?.currentUser.uid;
  const { photoUrl, text, uid, createdAt } = message;
  const messageClass = uid === user ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoUrl} />
        <p>{text}</p>
        <span className="message-timestamp"></span>
      </div>
    </>
  );
}

export default ChatMessage;
