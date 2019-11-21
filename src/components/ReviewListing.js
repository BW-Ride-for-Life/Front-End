import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {connect} from 'react-redux';

import ActionBtn from './ActionBtn';
import ReviewListingCard from './ReviewListingCard';

// *@* redux actions
import {getAllReviews} from '../actions';


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


function ReviewListing(props) {
  // console.log("In DriverListing & props:",props);
  const {
    //Redux state bindings
    allRevuData,
    //Redux action bindings
    getAllReviews, 
    //React router props
    history,
  } = props;

  const [momName,setMomName] = useState("");
  

  useEffect(() => {
    getAllReviews();
    const fromSess = JSON.parse(sessionStorage.getItem('momInfo'));
    setMomName(fromSess.name);
  }, []);

  //This is to go back to mom profile
  function clickHandlerBack(e) {
    history.push('/profMom');
  }

  
  
  return (
    <>
      
      <MyH1Chr>{`All reviews for mom: ${momName}`}</MyH1Chr>

      <ActionBtn textDisplay={"Back To Profile"} clickHandler={clickHandlerBack}/>
      
      {/* {console.log("In DriversListing & alldrvData:",alldrvData)} */}

      {/* {console.log("In DriversListing & searchTerm:",searchTerm)}
      {console.log("In DriversListing & searchTerm:",searchTerm)} */}

      <CardDivChrList>
        {allRevuData.map( (elem) => 
          <ReviewListingCard key={elem.id}
          data={elem}
          history={history}
          />
        )}
      </CardDivChrList>



      
    </>
  );
} //End of ReviewListing function


function mapStateToProps(state) {
  return {
    allRevuData: state.allRevuData,
  };
}

export default connect(mapStateToProps,
  {getAllReviews}
)(ReviewListing);

