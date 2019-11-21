import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosWithAuth from '../modules/axiosAuth';

import SmallBtn from './SmallBtn';
import {pathPrefix} from '../actions'; 

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
  height:180px;
  margin:10px 0;
  display:flex;
  flex-direction: column;
  justify-content: left;
`;


export default function ReviewListingCard(props) {
  // console.log("In ReviewListingCard & props:",props);
  const {driver_id,id,rating,review_date,review_text,user_id,reviewer} = props.data;

  const [drvName,setDrvName] = useState("");

  useEffect(() => {

    const pathSuffix = "/api/drivers/" + driver_id;

    axiosWithAuth()
    .get(pathPrefix+pathSuffix)
    .then(res => {
      // console.log("This is data from server in useEffect in ReviewListingCard THEN :",res.data);
      
      setDrvName(res.data.drivers_name);

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of driverUpdate err:",err);
      console.log("This is data from server, in CATCH of driverUpdate err.response:",err.response);
      
    });

  }, []);


  function updateHandler() {
    // console.log("Update button clicked in ReviewListingCard page");
    
    const date = new Date();
    const month = (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : ""+(date.getMonth()+1);
    const day = (date.getDate()<10 ? "0"+date.getDate() : date.getDate());
    const year = date.getFullYear();
    const dateString = ""+year+"-"+month+"-"+day;
    
    let updateRevuData = {
      drivers_name: drvName,
      id: id,
      reviewer: reviewer,
      review_date: dateString,
      user_id: user_id,
      driver_id: driver_id,
    }
    sessionStorage.setItem("updateRevuData", JSON.stringify(updateRevuData));
    props.history.push('/updateRevu');
  }

  function deleteHandler() {
    console.log("Update button clicked in ReviewListingCard page");
    // sessionStorage.setItem("driverCardId", id);
    // props.history.push('/reviewList');
  }


  return (
    <MyDivCharCrd>
      <MyH3CharCrd>{`Name of driver: ${drvName}`}</MyH3CharCrd>
      <MyPCharCrd>{`Driver rating: ${rating}`}</MyPCharCrd> 
      <MyPCharCrd>{`Review date: ${review_date}`}</MyPCharCrd>
      <MyPCharCrd>{`Review: ${review_text}`}</MyPCharCrd>
      <SmallBtn textDisplay="Update review" clickHandler={updateHandler}/>
      <SmallBtn textDisplay="Delete review" clickHandler={deleteHandler}/>
    </MyDivCharCrd>
    
  );

}

 