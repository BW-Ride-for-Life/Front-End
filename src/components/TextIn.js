import React from 'react';
import { Field } from "formik";
import styled from "styled-components";


const boxLength="300px";
const boxHeight="30px;"


const DivEntryBox = styled.div`
  border:1px solid grey;
  border-radius:5px;
  width:${boxLength};
  height:${boxHeight};
  display: flex;
  align-items: center;
  justify-content: left;
`;

const DivMsgBox = styled.div`
  // border:1px solid grey;
  border-radius:5px;
  width:${boxLength};
  height:${boxHeight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledField = styled(Field)`
  font-size:16px;
  font-family: 'Muli', sans-serif;
  border:none;
`;

const Img = styled.img`
  width:20px;
  margin-right:3px;
  // border:1px solid grey;
`;


export default function TextIn({fieldName,fieldType,fieldPlaceHolder,touched,errors,iconImg,imgTxt}) {
  return (
    <div>
      <DivEntryBox>
        <Img src={iconImg} alt={imgTxt} />
        <StyledField type={fieldType} name={fieldName} placeholder={fieldPlaceHolder} size="28" />
      </DivEntryBox>
      <DivMsgBox>
        {touched && errors && (<p>{errors}</p>)}
      </DivMsgBox>
    </div>
  );
}


