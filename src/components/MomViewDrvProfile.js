import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import styled from "styled-components";

import ActionBtn from './ActionBtn';
import MomViewDrvCard from './MomViewDrvCard';

// *@* redux actions
import {getMomViewDrvData} from '../actions';

const CardDivChrList = styled.div`
  display: flex;
  justify-content:space-around;
  flex-wrap:wrap;
  align-items: center;
`;

function MomViewDrvProfile(props) {
	const {
    //Redux state bindings
    momViewDrvProf, momViewDrvRev,
    //Redux action bindings
    getMomViewDrvData,
    //React router props
    history,
  } = props;


  useEffect(() => {
    getMomViewDrvData();
  }, []);

  
 
  //This is to go back to driver listings
  function clickHandlerBack(e) {
    e.preventDefault();
    console.log("Back to Listings button in MomViewDrvProfile clicked");
    sessionStorage.removeItem("driverCardId");
    history.push('/drvList');
  }
 
  
	return ( <>

		<h1>Driver details page. </h1>
    
    <ActionBtn textDisplay={"Back To Listings"} clickHandler={clickHandlerBack}/>
    

    <p>{`Driver's name: ${momViewDrvProf.name}`}</p>
    <p>{`Driver's email: ${momViewDrvProf.email}`}</p>
    <p>{`Driver's phoneNo: ${momViewDrvProf.phoneNo}`}</p>
    <p>{`Driver's plot: ${momViewDrvProf.plot}`}</p>
    <p>{`Driver's price: ${momViewDrvProf.price}`}</p>

    <CardDivChrList>
        {momViewDrvRev.map( (elem) => 
          <MomViewDrvCard key={elem.id}
          data={elem}
          history={history}
          />
        )}
    </CardDivChrList>
    
    
    

    


	</> );
} //End of MomViewDrvProfile function

function mapStateToProps(state) {
  return {
    momViewDrvProf: state.momViewDrvProf,
    momViewDrvRev: state.momViewDrvRev,
  };
}

export default connect(mapStateToProps,
  {getMomViewDrvData}
)(MomViewDrvProfile);

