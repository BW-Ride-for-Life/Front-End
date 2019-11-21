import axios from "axios";
import axiosWithAuth from '../modules/axiosAuth';
import delay from '../modules/delay';

// For login page
export const LGIN_START = "LGIN_START";
export const LGIN_SUCC = "LGIN_SUCC";
export const LGIN_FAIL = "LGIN_FAIL";
export const LGIN_MOVE = "LGIN_MOVE"; // This will change the lgnMove state flag to true and casue a move from login page to 
                                      // profile page of mom/driver
export const LGIN_MOVE_CLR = "LGIN_MOVE_CLR"; //This clears the lgnMove state flag, once the move signal is received.

// For logout and delete mom/driver
export const REDUX_INI = "REDUX_INI";

// For driver register page
export const DRV_REG_START = "DRV_REG_START"; 
export const DRV_REG_SUCC = "DRV_REG_SUCC"; 
export const DRV_REG_FAIL = "DRV_REG_FAIL"; 
export const DRV_REG_MOVE = "DRV_REG_MOVE";  
export const DRV_REG_MOVE_CLR = "DRV_REG_MOVE_CLR";

//For driver profile page
export const DRV_PROF_START = "DRV_PROF_START"; 
export const DRV_PROF_SUCC = "DRV_PROF_SUCC"; 
export const DRV_PROF_FAIL = "DRV_PROF_FAIL"; 

//For driver update page
export const DRV_UPDT_START = "DRV_UPDT_START"; 
export const DRV_UPDT_SUCC = "DRV_UPDT_SUCC"; 
export const DRV_UPDT_FAIL = "DRV_UPDT_FAIL"; 
export const DRV_UPDT_MOVE = "DRV_UPDT_MOVE"; 
export const DRV_UPDT_CLR_MOVE = "DRV_UPDT_CLR_MOVE";
export const DRV_UPDT_CLR_DRV_INFO = "DRV_UPDT_CLR_DRV_INFO";

//For mom/driver account delete
export const DELETE_MOVE = "DELETE_MOVE"; 

// For mom register page
export const MOM_REG_START = "MOM_REG_START"; 
export const MOM_REG_SUCC = "MOM_REG_SUCC"; 
export const MOM_REG_FAIL = "MOM_REG_FAIL"; 
export const MOM_REG_MOVE = "MOM_REG_MOVE";  
export const MOM_REG_MOVE_CLR = "MOM_REG_MOVE_CLR";

//For driver profile page
export const MOM_PROF_START = "MOM_PROF_START"; 
export const MOM_PROF_SUCC = "MOM_PROF_SUCC"; 
export const MOM_PROF_FAIL = "MOM_PROF_FAIL"; 

//For mom update page
export const MOM_UPDT_START = "MOM_UPDT_START"; 
export const MOM_UPDT_SUCC = "MOM_UPDT_SUCC"; 
export const MOM_UPDT_FAIL = "MOM_UPDT_FAIL"; 
export const MOM_UPDT_MOVE = "MOM_UPDT_MOVE"; 
export const MOM_UPDT_CLR_MOVE = "MOM_UPDT_CLR_MOVE";
export const MOM_UPDT_CLR_MOM_INFO = "MOM_UPDT_CLR_MOM_INFO";

//For drivers listing page
export const ALLDRV_SAVE = "ALLDRV_SAVE"; 

// For Mom View of Driver Information
export const MOMVIEW_DRVPROF = "MOMVIEW_DRVPROF"; 
export const MOMVIEW_DRVREVU = "MOMVIEW_DRVREVU"; 



const delay_time = 1500;  //This is length of artificial delay time so that we can see different states

//const pathPrefix = "https://ride-for-life-back-end.herokuapp.com"; // for deployed site
const pathPrefix = "http://localhost:5014"; // for local server for debugging purposes


// ***************************************************
// ***************************************************
// Logs in the user
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

// ***************************************************
// ***************************************************
//Logs out a user
export function reduxInitialize() {
  return {
    type: REDUX_INI,
  };
}




// ***************************************************
// ***************************************************
//Registers a driver
export function driverReg(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:DRV_REG_START});
    
    const dataToSrv = {
      drivers_name: dataFromForm.name, 
      drivers_plot: dataFromForm.plot, 
      drivers_phone_number: dataFromForm.phoneNo,
      drivers_email: dataFromForm.email,
      password: dataFromForm.password,
      drivers_price: parseInt(dataFromForm.price, 10), // <-------- INTEGER
    };

    axios
    .post(pathPrefix + "/api/auth/register_driver",dataToSrv)
    .then(res => {
      console.log("This is data from server in driverReg THEN :",res.data);
      delay(delay_time); //This is artificail delay time so that we can see different states
      dispatch({type:DRV_REG_SUCC});

      setTimeout(()=>{
        dispatch({type:DRV_REG_MOVE});
      },delay_time)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of driverReg err:",err);
      console.log("This is data from server, in CATCH of driverReg err.response:",err.response);
      delay(delay_time); //This is artificail delay time so that we can see different states
      const errMsg = ""+err+".   Please try again later.";
      dispatch({type:DRV_REG_FAIL,payload:errMsg});
    });

  };
}

export function clear_drvRegMovePage() {
  return {
    type: DRV_REG_MOVE_CLR,
  };
}

// ***************************************************
// ***************************************************
// Gets driver data for driver profile page
export function getDriverProfileData() {
  return function(dispatch) {
    
    dispatch({type:DRV_PROF_START});
    
    const pathSuffix = "/api/drivers/" + sessionStorage.getItem('id');

    setTimeout(()=>{
      axiosWithAuth()
      .get(pathPrefix+pathSuffix)
      .then(res => {
        console.log("This is data from server in getDriverProfileData THEN :",res.data);

        const dataToUserInfoState = {
          name: res.data.drivers_name,
          plot: res.data.drivers_plot,
          phoneNo: res.data.drivers_phone_number,
          email: res.data.drivers_email,
          price: res.data.drivers_price,
        }

        dispatch({type:DRV_PROF_SUCC,payload:dataToUserInfoState});
      })
      .catch(err => {
        console.log("This is data from server, in CATCH of getDriverProfileData err:",err);
        console.log("This is data from server, in CATCH of getDriverProfileData err.response:",err.response);
        const errMsg = ""+err+".   Please try again later.";
        dispatch({type:DRV_PROF_FAIL,payload:errMsg});
      });
    },delay_time)

  };
}


// ***************************************************
// ***************************************************
// Updates a driver
export function driverUpdate(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:DRV_UPDT_START});
    
    const dataToSrv = {
      drivers_name: dataFromForm.name, 
      drivers_plot: dataFromForm.plot, 
      drivers_phone_number: dataFromForm.phoneNo,
      drivers_email: dataFromForm.email,
      password: dataFromForm.password,
      drivers_price: parseInt(dataFromForm.price, 10), // <-------- INTEGER
    };

    console.log("In driverUpdate & dataToSrv:",dataToSrv);

    const pathSuffix = "/api/drivers/" + sessionStorage.getItem('id');

    axiosWithAuth()
    .put(pathPrefix+pathSuffix,dataToSrv)
    .then(res => {
      console.log("This is data from server in driverUpdate THEN :",res.data);
      delay(delay_time); //This is artificail delay time so that we can see different states
      dispatch({type:DRV_UPDT_SUCC});

      setTimeout(()=>{
        dispatch({type:DRV_UPDT_MOVE});
      },delay_time)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of driverUpdate err:",err);
      console.log("This is data from server, in CATCH of driverUpdate err.response:",err.response);
      delay(delay_time); //This is artificail delay time so that we can see different states
      const errMsg = ""+err+".   Please try again later.";
      dispatch({type:DRV_UPDT_FAIL,payload:errMsg});
    });
    

  };
}

export function clear_drvInfo_DrvUpdatePg() {
  return {
    type: DRV_UPDT_CLR_DRV_INFO,
  };
}

export function clear_drvUpdateMovePage() {
  return {
    type: DRV_UPDT_CLR_MOVE,
  };
}

// ***************************************************
// ***************************************************
// Delete a driver
export function deleteDriver() {
  return function(dispatch) {
    
    const pathSuffix = "/api/drivers/" + sessionStorage.getItem('id');

    axiosWithAuth()
    .delete(pathPrefix+pathSuffix)
    .then(res => {
      console.log("This is data from server in deleteDriver THEN :",res.data);
      
      setTimeout(()=>{
        dispatch({type:DELETE_MOVE});
      },0)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of deleteDriver err:",err);
      console.log("This is data from server, in CATCH of deleteDriver err.response:",err.response);
      
      
    });
    

  };
}



// ***************************************************
// ***************************************************
//Registers a mom
export function momReg(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:MOM_REG_START});
    
    const dataToSrv = {
      users_name: dataFromForm.name, 
      users_plot: dataFromForm.plot, 
      users_phone_number: dataFromForm.phoneNo,
      users_email: dataFromForm.email,
      password: dataFromForm.password,
    };

    axios
    .post(pathPrefix + "/api/auth/register_user",dataToSrv)
    .then(res => {
      console.log("This is data from server in momReg THEN :",res.data);
      delay(delay_time); //This is artificail delay time so that we can see different states
      dispatch({type:MOM_REG_SUCC});

      setTimeout(()=>{
        dispatch({type:MOM_REG_MOVE});
      },delay_time)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of driverReg err:",err);
      console.log("This is data from server, in CATCH of driverReg err.response:",err.response);
      delay(delay_time); //This is artificail delay time so that we can see different states
      const errMsg = ""+err+".   Please try again later.";
      dispatch({type:MOM_REG_FAIL,payload:errMsg});
    });

  };
}

export function clear_momRegMovePage() {
  return {
    type: MOM_REG_MOVE_CLR,
  };
}


// ***************************************************
// ***************************************************
// Gets mom data for mom profile page
export function getMomProfileData() {
  return function(dispatch) {
    
    dispatch({type:MOM_PROF_START});
    
    const pathSuffix = "/api/users/" + sessionStorage.getItem('id');

    setTimeout(()=>{
      axiosWithAuth()
      .get(pathPrefix+pathSuffix)
      .then(res => {
        console.log("This is data from server in getMomProfileData THEN :",res.data);

        const dataToUserInfoState = {
          name: res.data.users_name,
          plot: res.data.users_plot,
          phoneNo: res.data.users_phone_number,
          email: res.data.users_email,
        }

        dispatch({type:MOM_PROF_SUCC,payload:dataToUserInfoState});
      })
      .catch(err => {
        console.log("This is data from server, in CATCH of getMomProfileData err:",err);
        console.log("This is data from server, in CATCH of getMomProfileData err.response:",err.response);
        const errMsg = ""+err+".   Please try again later.";
        dispatch({type:MOM_PROF_FAIL,payload:errMsg});
      });
    },delay_time)

  };
}


// ***************************************************
// ***************************************************
// Updates a mom
export function momUpdate(dataFromForm) {
  return function(dispatch) {
    
    dispatch({type:MOM_UPDT_START});
    
    const dataToSrv = {
      users_name: dataFromForm.name, 
      users_plot: dataFromForm.plot, 
      users_phone_number: dataFromForm.phoneNo,
      users_email: dataFromForm.email,
      password: dataFromForm.password,
    };

    console.log("In momUpdate & dataToSrv:",dataToSrv);

    const pathSuffix = "/api/users/" + sessionStorage.getItem('id');

    axiosWithAuth()
    .put(pathPrefix+pathSuffix,dataToSrv)
    .then(res => {
      console.log("This is data from server in momUpdate THEN :",res.data);
      delay(delay_time); //This is artificail delay time so that we can see different states
      dispatch({type:MOM_UPDT_SUCC});

      setTimeout(()=>{
        dispatch({type:MOM_UPDT_MOVE});
      },delay_time)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of momUpdate err:",err);
      console.log("This is data from server, in CATCH of momUpdate err.response:",err.response);
      delay(delay_time); //This is artificail delay time so that we can see different states
      const errMsg = ""+err+".   Please try again later.";
      dispatch({type:MOM_UPDT_FAIL,payload:errMsg});
    });
    

  };
}

export function clear_momInfo_MomUpdatePg() {
  return {
    type: MOM_UPDT_CLR_MOM_INFO,
  };
}

export function clear_momUpdateMovePage() {
  return {
    type: MOM_UPDT_CLR_MOVE,
  };
}


// ***************************************************
// ***************************************************
// Delete a mom
export function deleteMom() {
  return function(dispatch) {
    
    const pathSuffix = "/api/users/" + sessionStorage.getItem('id');

    axiosWithAuth()
    .delete(pathPrefix+pathSuffix)
    .then(res => {
      console.log("This is data from server in deleteMom THEN :",res.data);
      
      setTimeout(()=>{
        dispatch({type:DELETE_MOVE});
      },0)

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of deleteMom err:",err);
      console.log("This is data from server, in CATCH of deleteMom err.response:",err.response);
      
      
    });
    

  };
}


// ***************************************************
// ***************************************************
// For Drivers Listing page
export function getAllDrivers() {
  return function(dispatch) {
    
    const pathSuffix = "/api/drivers/";

    

    axiosWithAuth()
    .get(pathPrefix+pathSuffix)
    .then(res => {
      console.log("This is data from server in getAllDrivers THEN :",res.data);
      
      dispatch({type:ALLDRV_SAVE,payload:res.data});

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of getAllDrivers err:",err);
      console.log("This is data from server, in CATCH of getAllDrivers err.response:",err.response);
      
      
    });
    

  };
}


// ***************************************************
// ***************************************************
// For Mom View of Driver Information
export function getMomViewDrvData() {
  return function(dispatch) {
    
    //Get the driver profile
    let pathSuffix = "/api/drivers/" + sessionStorage.getItem('driverCardId');
    axiosWithAuth()
    .get(pathPrefix+pathSuffix)
    .then(res => {
      console.log("This is data from server in getMomViewDrvData 1st THEN :",res.data);

      const dataToUserInfoState = {
        name: res.data.drivers_name,
        plot: res.data.drivers_plot,
        phoneNo: res.data.drivers_phone_number,
        email: res.data.drivers_email,
        price: res.data.drivers_price,
      }

      dispatch({type:MOMVIEW_DRVPROF,payload:dataToUserInfoState});
    })
    .catch(err => {
      console.log("This is data from server, in CATCH of getDriverProfileData 1st err:",err);
      console.log("This is data from server, in CATCH of getDriverProfileData 1st err.response:",err.response);
      
    });
    

    //Get the driver reviews
    pathSuffix = "/api/drivers/" + sessionStorage.getItem('driverCardId') + "/reviews";
    axiosWithAuth()
    .get(pathPrefix+pathSuffix)
    .then(res => {
      console.log("This is data from server in getAllDrivers 2nd THEN :",res.data);
      
      dispatch({type:MOMVIEW_DRVREVU,payload:res.data});

    })
    .catch(err => {
      console.log("This is data from server, in CATCH of getAllDrivers 2nd err:",err);
      console.log("This is data from server, in CATCH of getAllDrivers 2nd err.response:",err.response);
      
      
    });
    

  };
}