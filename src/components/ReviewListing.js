import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {connect} from 'react-redux';

import ActionBtn from './ActionBtn';
import ReviewListingCard from './ReviewListingCard';

// *@* redux actions
import {getAllReviews,delay_time} from '../actions';


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
  const [updateMsg,setUpdateMsg] = useState("");
  
  useEffect(() => {
    const fromSess = JSON.parse(sessionStorage.getItem('momInfo'));
    setMomName(fromSess.name);
  }, []);


  useEffect(() => {
    if(updateMsg==="") {
      getAllReviews();
    }  

    if(updateMsg!=="") {
      setTimeout(()=>{
        setUpdateMsg("");
      },delay_time)
    }  

  }, [updateMsg]);

  //This is to go back to mom profile
  function clickHandlerBack(e) {
    history.push('/profMom');
  }

  //This is just used to trigger a redraw of this
  //page after a review is deleted with updating message
  function redrawReviewListing () {
    setUpdateMsg("Updating...");
  }
  
  
  return (
    <>
      
      <MyH1Chr>{`All reviews for mom: ${momName}`}</MyH1Chr>

      <ActionBtn textDisplay={"Back To Profile"} clickHandler={clickHandlerBack}/>

      <p>{updateMsg}</p>
      
      {/* {console.log("In DriversListing & alldrvData:",alldrvData)} */}

      {/* {console.log("In DriversListing & searchTerm:",searchTerm)}
      {console.log("In DriversListing & searchTerm:",searchTerm)} */}

      <CardDivChrList>
        {allRevuData.map( (elem) => 
          <ReviewListingCard key={elem.id}
          data={elem}
          history={history}
          redrawReviewListing={redrawReviewListing}

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

