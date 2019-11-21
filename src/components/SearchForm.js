import React, { useState } from "react";
import styled from "styled-components";

const MySecSrcFrm =  styled.section`
  // border:1px solid grey;
  text-align:center;
  margin-top:30px;
  margin-bottom:30px;
`;

const MyLblSrcFrm =  styled.label`
  // border:1px solid grey;
  margin-right:5px;
`;

const MyInpSrcFrm =  styled.input`
  border:2px solid black;
`;


export default function SearchForm({searchTerm,handleChange}) {
 
  return (
    <MySecSrcFrm className="search-form">
      
      <MyLblSrcFrm htmlFor="plot">Search by plot location:</MyLblSrcFrm>
      <MyInpSrcFrm
        type="text"
        placeholder="Search"
        name="plot"
        value={searchTerm}
        onChange={handleChange}
      />




    </MySecSrcFrm>
  );
}
