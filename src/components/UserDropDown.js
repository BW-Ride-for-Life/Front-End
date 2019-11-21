import React from 'react';
import { Field } from "formik";
import styled from "styled-components";


const boxLength="300px";
const boxHeight="30px;"


const DivEntryBox = styled.div`
//   border:1px solid grey;
//   border-radius:5px;
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
  background-color:lightgrey;
`;



export default function UserDropDown({fieldName,touched,errors}) {
  return (
    <div>
      <DivEntryBox>

        <StyledField component="select" name={fieldName}>
          <option>Choose User Type</option>
          <option value="mom">Mom</option>
          <option value="driver">Driver</option>
        </StyledField>


      </DivEntryBox>
      <DivMsgBox>
        {touched && errors && (<p>{errors}</p>)}
      </DivMsgBox>
    </div>
  );
}