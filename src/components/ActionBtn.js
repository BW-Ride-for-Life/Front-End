import React from 'react';
import styled from "styled-components";

const boxLength="300px";
const boxHeight="30px;"

const StyledButton = styled.button`
  border:1px solid blue;
  background-color:blue;
  color:white;
  border-radius:5px;
  width:${boxLength};
  height:${boxHeight};
  font-size:16px;
  font-family: 'Muli', sans-serif;
  margin:5px 5px;
`;

export default function ActionBtn({textDisplay,clickHandler}) {
  return (
    <>
      <StyledButton type="button" onClick={clickHandler}>{textDisplay}</StyledButton>
    </>
  );
} 