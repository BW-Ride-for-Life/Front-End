import {
  LGIN_START, LGIN_SUCC, LGIN_FAIL, LGIN_MOVE, LGIN_MOVE_CLR

} from '../actions';


// //This is the final initialState to use for final app
const initialState = {
  loginFormState: 0,  //0=not authenticated, 1=suthentication ongoing, 2=successful, 3=failure
  loginErrMsg:"",
  moveLoginToLanding: false,
  notLoggedIn: true,  
};


function reducer(state=initialState,action) {
  switch(action.type) {

    case LGIN_START: {
      console.log("In LGIN_START");
      const newState = {
        ...initialState,
        loginFormState: 1,
      } 
      return newState;
    }

    case LGIN_SUCC: {
      console.log("In LGIN_SUCC");
      const newState = {
        ...initialState,
        loginFormState: 2,
        notLoggedIn: false,      
      } 
      return newState;
    }

    case LGIN_MOVE: {
      console.log("In LGIN_MOVE");
      const newState = {
        ...state,
        moveLoginToLanding:true,
      } 
      return newState;
    }

    case LGIN_MOVE_CLR: {
      console.log("In LGIN_MOVE_CLR");
      const newState = {
        ...state,
        moveLoginToLanding:false,
      } 
      return newState;
    }

    case LGIN_FAIL: {
      console.log("In LGIN_FAIL");
      const newState = {
        ...initialState,
        loginFormState: 3,
        loginErrMsg:"You put in the wrong password",
      } 
      return newState;
    }
   

    default:
      return state;
  }
}

export default reducer;