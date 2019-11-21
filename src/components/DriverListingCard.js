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
  width:300px;
  height:120px;
  margin:10px 0;
`;


export default function DriverListingCard(props) {
  const {drivers_name,drivers_email,drivers_phone_number,drivers_plot,drivers_price} = props.data;
  
  return (
    <MyDivCharCrd>
      <MyH3CharCrd>{`Name: ${drivers_name}`}</MyH3CharCrd>
      <MyPCharCrd>{`Email: ${drivers_email}`}</MyPCharCrd>
      <MyPCharCrd>{`PhoneNo: ${drivers_phone_number}`}</MyPCharCrd>
      <MyPCharCrd>{`Plot: ${drivers_plot}`}</MyPCharCrd>
      <MyPCharCrd>{`Price: ${drivers_price}`}</MyPCharCrd>
    </MyDivCharCrd>
    
  );

}
