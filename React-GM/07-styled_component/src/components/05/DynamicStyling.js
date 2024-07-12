import React from "react";
import Button from "./Button";

import styled from "styled-components";

const Container = styled.div`
  ${Button} {
    margin: 10px;
  }
`;

function DynamicStyling(props) {
  return (
    <Container>
      <h1>기본버튼</h1>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
      <h1>둥근버튼</h1>
      <Button size="small" $round>
        round small
      </Button>
      <Button size="medium" $round>
        round medium
      </Button>
      <Button size="large" $round>
        round large
      </Button>
    </Container>
    //   표준속성 <---> 비표준속성 앞에는 $를 넣어준다
  );
}

export default DynamicStyling;
