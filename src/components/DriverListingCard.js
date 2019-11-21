import React from "react";
import styled from "styled-components";

import SmallBtn from './SmallBtn';

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
  height:160px;
  margin:10px 0;
  display:flex;
  flex-direction: column;
  justify-content: left;

`;


export default function DriverListingCard(props) {
  // console.log("In DriverListingCard & props:",props);
  const {drivers_name,drivers_email,drivers_phone_number,drivers_plot,drivers_price,id} = props.data;

  function profileHandler() {
    // console.log("Profile Page button clicked in Driver Card, driverID:",id);
    sessionStorage.setItem("driverCardId", id);
    props.history.push('/momViewDrvProf');
  }

  function reviewHandler() {
    console.log("Review button clicked in Driver Card, driverID:",id);
  }


  return (
    <MyDivCharCrd>
      <MyH3CharCrd>{`Name: ${drivers_name}`}</MyH3CharCrd>
      <MyPCharCrd>{`Email: ${drivers_email}`}</MyPCharCrd>
      <MyPCharCrd>{`PhoneNo: ${drivers_phone_number}`}</MyPCharCrd>
      <MyPCharCrd>{`Plot: ${drivers_plot}`}</MyPCharCrd>
      <MyPCharCrd>{`Price: ${drivers_price}`}</MyPCharCrd>
      <SmallBtn textDisplay="To Profile Page" clickHandler={profileHandler}/>
      <SmallBtn textDisplay="To Review Add/Update/Delete" clickHandler={reviewHandler}/>
    </MyDivCharCrd>
    
  );

}

 