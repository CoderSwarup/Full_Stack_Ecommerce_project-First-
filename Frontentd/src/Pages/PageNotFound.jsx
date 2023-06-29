import React from "react";
import styled from "styled-components";
export default function PageNotFound() {
  return (
    <Wrapper>
      <img src="./image/error.svg" alt="" />
      <h1>GO BACK </h1>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 80vh;
  display: grid;
  place-items: center;

  img {
    width: 500px;
  }
`;
