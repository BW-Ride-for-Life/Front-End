import axios from "axios";
import axiosWithAuth from '../modules/axiosAuth';
import delay from '../modules/delay';

export const LGIN_START = "LGIN_START";
export const LGIN_SUCC = "LGIN_SUCC";
export const LGIN_FAIL = "LGIN_FAIL";
export const LGIN_MOVE = "LGIN_MOVE"; // This will change the lgnMove state flag to true and casue a move from login page to 
                                      // profile page of mom/driver
export const LGIN_MOVE_CLR = "LGIN_MOVE_CLR"; //This clears the lgnMove state flag, once the move signal is received.

export const FORM_START = "FORM_START"; 
export const FORM_SUCC = "FORM_SUCC"; 
export const FORM_FAIL = "FORM_FAIL"; 
export const PAGE_MOVE = "PAGE_MOVE";  //Used to move from one page Driver Register Form to Login/Driver Profile page
export const PAGE_MOVE_CLR = "PAGE_MOVE_CLR";
export const CLEAR_DRIVER_INFO = "CLEAR_DRIVER_INFO";
export const PAGE_RESET_SET_DRIVER_INFO = "PAGE_RESET_SET_DRIVER_INFO";

const delay_time = 1500;  //This is length of artificial delay time so that we can see different states

//const pathPrefix = "https://ride-for-life-back-end.herokuapp.com"; // for deployed site
const pathPrefix = "http://localhost:5014"; // for local server for debugging purposes


//Logs in the user
export function loginToServer(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:LGIN_START});

    let dataToSrv;
    let loginWebAddress;

    if(dataFromForm.userType==="mom") {
      loginWebAddress = pathPrefix + "/api/auth/user_login";
      dataToSrv = {
        users_email: dataFromForm.email,
        password: dataFromForm.password,
      };
    }

    if(dataFromForm.userType==="driver") {
      loginWebAddress = pathPrefix + "/api/auth/driver_login";
      dataToSrv = {
        drivers_email: dataFromForm.email,
        password: dataFromForm.password,
      };
    }

    axios
      .post(loginWebAddress, dataToSrv)
      .then(res => {
        // console.log("This is data from server, in THEN of loginSrv:",res);
        // console.log("This is data from server, in THEN of loginSrv:",res.data);
        delay(delay_time); //This is artificail delay time so that we can see different states
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("tokenType", dataFromForm.userType);
        sessionStorage.setItem("id", res.data.id);

        dispatch({type:LGIN_SUCC});

        // This is just there so that the user sees the message that we are 
        // moving automatically from login to mom/driver profile page
        setTimeout(()=>{
            dispatch({type:LGIN_MOVE});
        },delay_time)
      })
      .catch(err => {   
        console.log("This is data from server, in CATCH of loginSrv err:",err);
        console.log("This is data from server, in CATCH of loginSrv err.response:",err.response);
        delay(delay_time); //This is artificail delay time so that we can see different states
        if(err.response && (err.response.status===400 || err.response.status===500) ) {
          const errMsg = "You have entered an invalid login email and/or password";
          dispatch({type:LGIN_FAIL,payload:errMsg});
        } else {
          const errMsg = ""+err;
          dispatch({type:LGIN_FAIL,payload:errMsg});
        }
      });

  };
}

export function clear_moveLoginToLanding() {
  return {
    type: LGIN_MOVE_CLR,
  };
}


//Registers or Updates a driver
export function driverRegUpd(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:FORM_START});
    
    const dataToSrv = {
      drivers_name: dataFromForm.name, 
      drivers_plot: dataFromForm.plot, 
      drivers_phone_number: dataFromForm.phoneNo,
      drivers_email: dataFromForm.email,
      password: dataFromForm.password,
      drivers_price: parseInt(dataFromForm.price, 10), // <-------- INTEGER
    };

    // If a driver is logged on, then we have to do an update
    if(sessionStorage.getItem('token') && (sessionStorage.getItem('tokenType')==='driver')) {

      const pathSuffix = "/api/drivers/" + sessionStorage.getItem('id');

      axiosWithAuth()
      .put(pathPrefix+pathSuffix,dataToSrv)
      .then(res => {
        console.log("This is data from server in driverRegUpd-put THEN :",res.data);
        delay(delay_time); //This is artificail delay time so that we can see different states
        dispatch({type:FORM_SUCC});

        setTimeout(()=>{
          dispatch({type:PAGE_MOVE});
        },delay_time)

      })
      .catch(err => {
        console.log("This is data from server, in CATCH of driverRegUpd-put err:",err);
        console.log("This is data from server, in CATCH of driverRegUpd-put err.response:",err.response);
        delay(delay_time); //This is artificail delay time so that we can see different states
        const errMsg = ""+err+".   Please try again later.";
        dispatch({type:FORM_FAIL,payload:errMsg});
      });


    } else { //If no driver is logged on then we must create a new driver

      axios
      .post(pathPrefix + "/api/auth/register_driver",dataToSrv)
      .then(res => {
        console.log("This is data from server in driverRegUpd-post THEN :",res.data);
        delay(delay_time); //This is artificail delay time so that we can see different states
        dispatch({type:FORM_SUCC});

        setTimeout(()=>{
          dispatch({type:PAGE_MOVE});
        },delay_time)

      })
      .catch(err => {
        console.log("This is data from server, in CATCH of driverRegUpd-post err:",err);
        console.log("This is data from server, in CATCH of driverRegUpd-post err.response:",err.response);
        delay(delay_time); //This is artificail delay time so that we can see different states
        const errMsg = ""+err+".   Please try again later.";
        dispatch({type:FORM_FAIL,payload:errMsg});
      });

    }

  };
}

export function clear_movePageToPage() {
  return {
    type: PAGE_MOVE_CLR,
  };
}


//Gets driver data
export function getDriverData() {
  return function(dispatch) {
    
    dispatch({type:FORM_START});
    
    const pathSuffix = "/api/drivers/" + sessionStorage.getItem('id');

    setTimeout(()=>{
      axiosWithAuth()
      .get(pathPrefix+pathSuffix)
      .then(res => {
        console.log("This is data from server in getDriverData THEN :",res.data);

        const dataToUserInfoState = {
          name: res.data.drivers_name,
          plot: res.data.drivers_plot,
          phoneNo: res.data.drivers_phone_number,
          email: res.data.drivers_email,
          price: res.data.drivers_price,
        }

        dispatch({type:PAGE_RESET_SET_DRIVER_INFO,payload:dataToUserInfoState});
      })
      .catch(err => {
        console.log("This is data from server, in CATCH of getDriverData err:",err);
        console.log("This is data from server, in CATCH of getDriverData err.response:",err.response);
        const errMsg = ""+err+".   Please try again later.";
        dispatch({type:FORM_FAIL,payload:errMsg});
      });
    },delay_time)

  };
}


export function clear_driverInfo() {
  return {
    type: CLEAR_DRIVER_INFO,
  };
}