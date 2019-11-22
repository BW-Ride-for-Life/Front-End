import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {connect} from 'react-redux';

import DriverListingCard from './DriverListingCard';
import ActionBtn from './ActionBtn';
import SearchForm from './SearchForm';

// *@* redux actions
import {getAllDrivers} from '../actions';


const MyH1Chr = styled.h1`
  // border:1px solid grey;
  text-align:center;
  // font-size:16px;
`;

const CardDivChrList = styled.div`
  display: flex;
  justify-content:space-around;
  flex-wrap:wrap;
  align-items: center;
`;


function DriverListing(props) {
  // console.log("In DriverListing & props:",props);
  const {
    //Redux state bindings
    alldrvData,
    //Redux action bindings
    getAllDrivers, 
    //React router props
    history,
  } = props;
  
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllDrivers();
  }, []);

  useEffect(() => {
    const results = alldrvData.filter(drv =>
      drv.drivers_plot.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm,alldrvData]);

  
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  //This is to go back to mom profile
  function clickHandlerBack(e) {
    history.push('/profMom');
  }

  return (
    <>
      
      <MyH1Chr>Driver Listing</MyH1Chr>
      
      <ActionBtn textDisplay={"Back To Profile"} clickHandler={clickHandlerBack}/>

      {/* {console.log("In DriversListing & alldrvData:",alldrvData)} */}

      {/* {console.log("In DriversListing & searchTerm:",searchTerm)}
      {console.log("In DriversListing & searchTerm:",searchTerm)} */}

      <SearchForm
        handleChange={handleChange}
        searchTerm={searchTerm}
      />

      <CardDivChrList>
        {searchResults.map( (elem) => 
          <DriverListingCard key={elem.id}
          data={elem}
          history={history}
          />
        )}
      </CardDivChrList>
    </>
  );
} //End of DriverListing function


function mapStateToProps(state) {
  return {
    alldrvData: state.alldrvData,
  };
}

export default connect(mapStateToProps,
  {getAllDrivers}
)(DriverListing);

