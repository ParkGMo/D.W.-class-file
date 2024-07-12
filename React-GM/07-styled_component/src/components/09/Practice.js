import React from "react";
import Input from "./Input";
import imgIcon from "./search.png";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

// const ImgTag = styled.img`
//   width: 22px;
//   position: absolute;
//   left: 32px;
//   bottom: 36px;
// `;

const SearchInput = styled(Input)`
  background-image: url(${imgIcon});
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: left 12px top 60%;
  padding-left: 40px;
`;

export function Practice(props) {
  return (
    <Container>
      <h2>Input</h2>
      <Input />
      <h2>search Input</h2>
      {/* <ImgTag src={imgIcon} /> */}
      <SearchInput $paddingLeft />
    </Container>
  );
}
