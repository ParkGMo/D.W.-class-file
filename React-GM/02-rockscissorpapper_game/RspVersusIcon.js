import React from "react";

function RspVersusIcon(props) {
  return (
    <div className="rsp-versus-icons">
      <img className="rsp-versus-icon myrsp-icon" src={rock} />
      <p className="vs-word">VS</p>
      <img className="rsp-versus-icon otherrsp-icon" src={rock} />
    </div>
  );
}

export default RspVersusIcon;
