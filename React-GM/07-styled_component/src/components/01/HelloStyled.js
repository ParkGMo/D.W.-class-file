import React from "react";
import Button from "./button";
import Wrapper from "./Wrapper";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import Box from "./Box";
import Circle from "./Circle";
import Input from "./Input";

function HelloStyled(props) {
  return (
    <div>
      {/* <Button>Hello Styled!!</Button> */}
      <Wrapper>
        {/* <BoxOne />
        <BoxTwo /> */}
        <Circle bgColor="#574b90" />
        <Box bgColor="#cf6a87">
          <span>😶</span>
        </Box>
        <Box as="button" bgColor="#574b90" />
        {/* as 속성은 다른 태그로 바꿔준다. */}
        <Circle bgColor="#cf6a87" />
      </Wrapper>
      <form>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <Button>제출</Button>
        </Wrapper>
        <Wrapper>
          <Circle bgColor="yellow" />
        </Wrapper>
      </form>
    </div>
  );
}

export default HelloStyled;
