import React from "react";
import styled from "styled-components";


const MyH3CharCrd =  styled.h3`
  // border:1px solid grey;
  margin:2px 0;
`;

const MyPCharCrd =  styled.p`
  // border:1px solid grey;
  margin:2px 0;
`;


const MyDivCharCrd =  styled.div`
  border:1px solid blue;
  text-align:left;
  width:400px;
  height:160px;
  margin:10px 0;
  display:flex;
  flex-direction: column;
  justify-content: left;

`;


export default function MomViewDrvCard(props) {
  // console.log("In DriverListingCard & props:",props);
  const {reviewer, review_date, rating, review_text} = props.data;


  return (
    <MyDivCharCrd>
      <MyH3CharCrd>{`Reviewer Name: ${reviewer}`}</MyH3CharCrd>
      <MyPCharCrd>{`Review Date: ${review_date}`}</MyPCharCrd>
      <MyPCharCrd>{`Rating: ${rating}`}</MyPCharCrd>
      <MyPCharCrd>{`Review: ${review_text}`}</MyPCharCrd>
    </MyDivCharCrd>
    
  );

}

 