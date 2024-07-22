import React from "react";
import Avatar from "./Avatar";

function Writer({ className, writer }) {
  const {
    name,
    level,

    profile: { photo },
  } = writer;
  return (
    <div>
      <div>
        <div className="">{name}</div>
        <div className="">{level}</div>
      </div>
      <Avatar photoUrl={photo} />
    </div>
  );
}

export default Writer;
