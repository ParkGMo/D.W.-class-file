import React from "react";
import tempImg from "../assets/ralo-profile.png";

function ChatMessage({ messages }) {
  return (
    <>
      {messages.map((message) => {
        const { photoUrl, text } = message.data();
        return (
          <div className="message sent">
            <img src={photoUrl} />
            <p>{text}</p>
          </div>
        );
      })}
    </>
  );
}

export default ChatMessage;
