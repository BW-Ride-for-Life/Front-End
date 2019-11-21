import React from 'react';
import styled from "styled-components";


const StyledButton = styled.button`
  border:none;
  background-color:white;
  color:blue;
  text-decoration:underline;
  width:fit-content;
  font-size:10px;
  // font-family: 'Muli', sans-serif;
  margin:5px 5px;
`;

export default function SmallBtn({textDisplay,clickHandler}) {
  return (
    <>
      <StyledButton type="button" onClick={clickHandler}>{textDisplay}</StyledButton>
    </>
  );
} 