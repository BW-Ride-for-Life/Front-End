import {
  //For login form
  LGIN_START, LGIN_SUCC, LGIN_FAIL, LGIN_MOVE, LGIN_MOVE_CLR,

  // For logout and delete mom/driver
  REDUX_INI,

  //For driver registration form
  DRV_REG_START, DRV_REG_SUCC, DRV_REG_FAIL, DRV_REG_MOVE, DRV_REG_MOVE_CLR,

  //For driver profile page
  DRV_PROF_START, DRV_PROF_SUCC, DRV_PROF_FAIL,

  //For driver update page
  DRV_UPDT_START, DRV_UPDT_SUCC, DRV_UPDT_FAIL, DRV_UPDT_MOVE, DRV_UPDT_CLR_MOVE, DRV_UPDT_CLR_DRV_INFO,

  //For mom/driver account delete
  DELETE_MOVE,

  //For mom registration form
  MOM_REG_START, MOM_REG_SUCC, MOM_REG_FAIL, MOM_REG_MOVE, MOM_REG_MOVE_CLR,

  //For mom profile page
  MOM_PROF_START, MOM_PROF_SUCC, MOM_PROF_FAIL,

  //For mom update page
  MOM_UPDT_START, MOM_UPDT_SUCC, MOM_UPDT_FAIL, MOM_UPDT_MOVE, MOM_UPDT_CLR_MOVE, MOM_UPDT_CLR_MOM_INFO,

} from '../actions';


// //This is the final initialState to use for final app
const initialState = {
  //For login form
  loginFormState: 0,  //0=not authenticated, 1=authentication ongoing, 2=successful, 3=failure
  loginErrMsg:"",
  moveLoginToLanding: false,
  notLoggedIn: true, 

  //For driver registration form
  drvRegState: 0, //0=no action taken, 1=action ongoing, 2=successful, 3=failure
  drvRegErrMsg:"",
  drvRegMove: false,

  //For driver profile page
  drvProfState: 0, //0=initial or success, 1=action ongoing, 2=failure
  drvProfErrMsg:"",

  //For driver update and driver profile pages
  driverInfo: {}, //This is the data on the driver from the server

  //For driver update form
  drvUpdtState: 0, //0=no action taken, 1=action ongoing, 2=successful, 3=failure
  drvUpdtErrMsg:"",
  drvUpdtMove: false,

  //For mom/driver account delete
  deleteMove:false,

  //For mom registration form
  momRegState: 0, //0=no action taken, 1=action ongoing, 2=successful, 3=failure
  momRegErrMsg:"",
  momRegMove: false,

  //For mom profile page
  momProfState: 0, //0=initial or success, 1=action ongoing, 2=failure
  momProfErrMsg:"",

  //For mom update and mom profile pages
  momInfo: {}, //This is the data on the mom from the server

  //For mom update form
  momUpdtState: 0, //0=no action taken, 1=action ongoing, 2=successful, 3=failure
  momUpdtErrMsg:"",
  momUpdtMove: false,

};


function reducer(state=initialState,action) {
  switch(action.type) {

//************************************************ */
//************* Begin LoginPage  ***************** */
    case LGIN_START: {
      const newState = {
        ...initialState,
        loginFormState: 1,
      } 
      return newState;
    }

    case LGIN_SUCC: {
      const newState = {
        ...initialState,
        loginFormState: 2,
        notLoggedIn: false,      
      } 
      return newState;
    }

    case LGIN_MOVE: {
      const newState = {
        ...state,
        moveLoginToLanding:true,
      } 
      return newState;
    }

    case LGIN_MOVE_CLR: {
      const newState = {
        ...state,
        moveLoginToLanding:false,
      } 
      return newState;
    }

    case LGIN_FAIL: {
      const newState = {
        ...initialState,
        loginFormState: 3,
        loginErrMsg:action.payload,
      } 
      return newState;
    }
//************* End LoginPage  ******************* */
//************************************************ */


//************************************************ */
//********** Begin For Logout & Delete *********** */

case REDUX_INI: {
  return initialState;
}




//********* End For Logout & Delete  ************* */
//************************************************ */



//************************************************ */
//********** Begin Driver Register *************** */
    case DRV_REG_START: {
      const newState = {
        ...state,
        drvRegState: 1,
      } 
      return newState;
    }

    case DRV_REG_SUCC: {
      const newState = {
        ...state,
        drvRegState: 2,
        drvRegErrMsg: "",      
      } 
      return newState;
    }

    case DRV_REG_FAIL: {
      const newState = {
        ...state,
        drvRegState: 3,
        drvRegErrMsg: action.payload,      
      } 
      return newState;
    }

    case DRV_REG_MOVE: {
      const newState = {
        ...state,
        drvRegMove:true,
      } 
      return newState;
    }

    case DRV_REG_MOVE_CLR: {
      const newState = {
        ...state,
        drvRegMove:false,
        drvRegState: 0,
        drvRegErrMsg:"",
      } 
      return newState;
    }

//********* End Driver Register  ***************** */
//************************************************ */


//************************************************ */
//********** Begin Driver Profile **************** */
case DRV_PROF_START: {
  const newState = {
    ...state,
    drvProfState: 1,
  } 
  return newState;
}

case DRV_PROF_SUCC: {
  const newState = {
    ...state,
    drvProfState: 0, 
    drvProfErrMsg: "",
    driverInfo: action.payload,     
  } 
  return newState;
}

case DRV_PROF_FAIL: {
  const newState = {
    ...state,
    drvProfState: 2,
    drvProfErrMsg: action.payload,      
  } 
  return newState;
}


//********* End Driver Profile  ****************** */
//************************************************ */


//************************************************ */
//********** Begin Driver Update **************** */
case DRV_UPDT_START: {
  const newState = {
    ...state,
    drvUpdtState: 1,
  } 
  return newState;
}

case DRV_UPDT_SUCC: {
  const newState = {
    ...state,
    drvUpdtState: 2,
    drvUpdtErrMsg: "",
  } 
  return newState;
}

case DRV_UPDT_FAIL: {
  const newState = {
    ...state,
    drvUpdtState: 3,
    drvUpdtErrMsg: action.payload,
  } 
  return newState;
}

case DRV_UPDT_MOVE: {
  const newState = {
    ...state,
    drvUpdtMove:true,
  } 
  return newState;
}

case DRV_UPDT_CLR_MOVE: {
  const newState = {
    ...state,
    drvUpdtMove:false,
    drvUpdtState: 0,
    drvUpdtErrMsg:"",
  } 
  return newState;
}

case DRV_UPDT_CLR_DRV_INFO: {
  const newState = {
    ...state,
    driverInfo:{},
  } 
  return newState;
}


//********* End Driver Update  ****************** */
//************************************************ */


//************************************************ */
//********** Begin Delete Driver   *************** */

case DELETE_MOVE: {
  const newState = {
    ...state,
    deleteMove:true,
  } 
  return newState;
}



//********** End Delete Driver  ****************** */
//************************************************ */




//************************************************ */
//********** Begin Mom Register *************** */
case MOM_REG_START: {
  const newState = {
    ...state,
    momRegState: 1,
  } 
  return newState;
}

case MOM_REG_SUCC: {
  const newState = {
    ...state,
    momRegState: 2,
    momRegErrMsg: "",      
  } 
  return newState;
}

case MOM_REG_FAIL: {
  const newState = {
    ...state,
    momRegState: 3,
    momRegErrMsg: action.payload,      
  } 
  return newState;
}

case MOM_REG_MOVE: {
  const newState = {
    ...state,
    momRegMove:true,
  } 
  return newState;
}

case MOM_REG_MOVE_CLR: {
  const newState = {
    ...state,
    momRegMove:false,
    momRegState: 0,
    momRegErrMsg:"",
  } 
  return newState;
}

//********* End Mom Register  ***************** */
//************************************************ */



//************************************************ */
//********** Begin Mom Profile **************** */
case MOM_PROF_START: {
  const newState = {
    ...state,
    momProfState: 1,
  } 
  return newState;
}

case MOM_PROF_SUCC: {
  const newState = {
    ...state,
    momProfState: 0, 
    momProfErrMsg: "",
    momInfo: action.payload,     
  } 
  return newState;
}

case MOM_PROF_FAIL: {
  const newState = {
    ...state,
    momProfState: 2,
    momProfErrMsg: action.payload,      
  } 
  return newState;
}


//********* End Mom Profile  ****************** */
//************************************************ */


//************************************************ */
//********** Begin Mom Update **************** */
case MOM_UPDT_START: {
  const newState = {
    ...state,
    momUpdtState: 1,
  } 
  return newState;
}

case MOM_UPDT_SUCC: {
  const newState = {
    ...state,
    momUpdtState: 2,
    momUpdtErrMsg: "",
  } 
  return newState;
}

case MOM_UPDT_FAIL: {
  const newState = {
    ...state,
    momUpdtState: 3,
    momUpdtErrMsg: action.payload,
  } 
  return newState;
}

case MOM_UPDT_MOVE: {
  const newState = {
    ...state,
    momUpdtMove:true,
  } 
  return newState;
}

case MOM_UPDT_CLR_MOVE: {
  const newState = {
    ...state,
    momUpdtMove:false,
    momUpdtState: 0,
    momUpdtErrMsg:"",
  } 
  return newState;
}

case MOM_UPDT_CLR_MOM_INFO: {
  const newState = {
    ...state,
    momInfo:{},
  } 
  return newState;
}


//********* End Mom Update  ****************** */
//************************************************ */














    default:
      return state;
    }
}

export default reducer;