import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput({ inputName, onChange, value }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(inputName, nextFile);
  };
  // snippets usf --> useEffact

  // Review 랜더링 --> FileInput 렌더링되면서 useEffact 실행
  // useEffect 내부 코드가 실행되고 사진변경
  //  =>ReviewForm 재 렌더링 => FileInput도 재 렌더링
  //  =>이때에는 useEffect 내부코드가 실행되는게 아니다.
  const handleClearClick = () => {
    const inputNode = inputRef;
    inputNode.current.value = "";
    onChange(inputName, null);
  };

  useEffect(() => {
    // value  값이 없을 수도 있기 때문에  useEffect를 종료해준다,
    if (!value) return;

    // ObjectURL 객체를 사용하여 미리보기 기능을 구현할 수 있다.
    // ObjectURL 을 만들면 웹 브라우저에 메모리를 할당한다.
    // 할당을 한 이후에는 해체를 해줘야한다. --> 메모리낭비를 방지
    // 해체를 하는 시점은 useEffect 에서 제공하는 사이드 이펙트를 정리하는 시점에 한다.
    // useEffect에서 return 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 제거할 수 있다.
    const nextpreview = URL.createObjectURL(value);
    setPreview(nextpreview);
    // 디펜던시 리스트에 있는 값이 바뀌면 다시 함수를 실행하는데 이전에 리액트는
    // 앞에서 리턴한 정리 함수(clean-up 함수)를 실행해서 사이드 이펙트를 정리한다.
    // 재렌더링 => useEffect 함수 실행 => 그 안에 있는 return  함수 기억
    //  => 사용자 파일이 변경되면 value 값 변경으로 인한 useEffect 함수 실행
    //  => 앞으로 기억해뒀던 return 함수 실행
    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextpreview);
    };
  }, [value]);

  useEffect(() => {}, []);

  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={preview || placeholderImg} />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/svg"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
