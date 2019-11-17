import {
  LGIN_START, LGIN_SUCC_MOM, LGIN_SUCC_DRV, LGIN_FAIL, LGIN_MOVE, LGIN_MOVE_CLR

} from '../actions';


// //This is the final initialState to use for final app
const initialState = {
  loginState: 0,  //0=not authenticated, 1=start suthentication, 2=successful, 3=failure
  loginErrMsg:"",
  isMom:false,
  isDriver:false,
  lgnMove:false,
  checkReset:"I AM reset",
};


function reducer(state=initialState,action) {
  switch(action.type) {

    case LGIN_START: {
      console.log("In LGIN_START");
      const newState = {
        ...initialState,
        loginState: 1,
        checkReset:"I am NOT reset",
      } 
      return newState;
    }

    case LGIN_SUCC_MOM: {
      console.log("In LGIN_SUCC_MOM");
      const newState = {
        ...initialState,
        loginState: 2,
        isMom:true,
        checkReset:"I am NOT reset",
      } 
      return newState;
    }

    case LGIN_SUCC_DRV: {
      console.log("In LGIN_SUCC_DRV");
      const newState = {
        ...initialState,
        loginState: 2,
        isDriver:true,
        checkReset:"I am NOT reset",
      } 
      return newState;
    }

    case LGIN_MOVE: {
      console.log("In LGIN_MOVE");
      const newState = {
        ...state,
        lgnMove:true,
        checkReset:"I am NOT reset",
      } 
      return newState;
    }

    case LGIN_MOVE_CLR: {
      console.log("In LGIN_MOVE_CLR");
      const newState = {
        ...state,
        lgnMove:false,
        checkReset:"I am NOT reset",
      } 
      return newState;
    }

    case LGIN_FAIL: {
      console.log("In LGIN_FAIL");
      const newState = {
        ...initialState,
        loginState: 3,
        loginErrMsg:"You put in the wrong password",
        checkReset:"I am NOT reset",
      } 
      return newState;
    }
   

    default:
      return state;
  }
}

export default reducer;