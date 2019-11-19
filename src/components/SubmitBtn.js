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
`;

export default function SubmitBtn({textDisplay}) {
  return (
    <>
      <StyledButton type="submit">{textDisplay}</StyledButton>
    </>
  );
} 