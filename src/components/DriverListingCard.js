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
  height:120px;
  margin:10px 0;
  display:flex;
  flex-direction: column;
  justify-content: left;

`;


export default function DriverListingCard(props) {
  console.log("In DriverListingCard & props:",props);
  const {drivers_name,drivers_plot,drivers_price,id} = props.data;

  function profileHandler() {
    // console.log("Profile Page button clicked in Driver Card, driverID:",id);
    sessionStorage.setItem("driverCardId", id);
    props.history.push('/momViewDrvProf');
  }

  function addRevuHandler() {
    console.log("Add review button clicked in Driver Listing Card");
    // sessionStorage.setItem("driverCardId", id);
    // props.history.push('/momViewDrvProf');
  }

  
  return (
    <MyDivCharCrd>
      <MyH3CharCrd>{`Name: ${drivers_name}`}</MyH3CharCrd>
      <MyPCharCrd>{`Plot: ${drivers_plot}`}</MyPCharCrd>
      <MyPCharCrd>{`Price: ${drivers_price}`}</MyPCharCrd>
      <SmallBtn textDisplay="To driver details page" clickHandler={profileHandler}/>
      <SmallBtn textDisplay="Add review for driver" clickHandler={addRevuHandler}/>
    </MyDivCharCrd>
    
  );

}

 