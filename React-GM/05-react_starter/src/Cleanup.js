import React, { useEffect, useState } from "react";

function Hello() {
  function effectFn() {
    console.log("create :)");
  }
  function destroyedFn() {
    console.log("destroy:(");
  }

  //   useEffect(effectFn, []);
  useEffect(() => {
    effectFn();
    //   화면에서 사라질때 return이 실행
    return () => {
      destroyedFn();
    };
  }, []);
  return <h1>Hello</h1>;
}

function Cleanup(props) {
  const [showing, setShowing] = useState(false);
  const onClick = (e) => {
    setShowing(!showing);
  };
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default Cleanup;
