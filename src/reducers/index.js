import {
  LGIN_START, LGIN_SUCC, LGIN_FAIL, LGIN_MOVE, LGIN_MOVE_CLR,
  FORM_START, FORM_SUCC, FORM_FAIL, PAGE_MOVE, PAGE_MOVE_CLR,
  CLEAR_DRIVER_INFO, PAGE_RESET_SET_DRIVER_INFO,
} from '../actions';


// //This is the final initialState to use for final app
const initialState = {
  loginFormState: 0,  //0=not authenticated, 1=authentication ongoing, 2=successful, 3=failure
  loginErrMsg:"",
  moveLoginToLanding: false,
  formState: 0, //0=no action taken, 1=action ongoing, 2=successful, 3=failure
  formErrMsg:"",
  movePageToPage: false,
  notLoggedIn: true,  
  actionTodo: "", //one of: "", 'register', 'update', 'delete', 'logout',
  driverInfo: {}, //This is the data on the driver from the server
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
//********** Begin Other Page/Form *************** */
    case FORM_START: {
      const newState = {
        ...state,
        formState: 1,
      } 
      return newState;
    }

    case FORM_SUCC: {
      const newState = {
        ...state,
        formState: 2,      
      } 
      return newState;
    }

    case FORM_FAIL: {
      const newState = {
        ...state,
        formState: 3,
        formErrMsg: action.payload,      
      } 
      return newState;
    }

    case PAGE_MOVE: {
      const newState = {
        ...state,
        movePageToPage:true,
      } 
      return newState;
    }

    case PAGE_MOVE_CLR: {
      const newState = {
        ...state,
        movePageToPage:false,
        formState: 0,
        formErrMsg:"",

      } 
      return newState;
    }

    case PAGE_RESET_SET_DRIVER_INFO: {
      const newState = {
        ...state,
        formState: 0,
        formErrMsg:"",
        driverInfo: action.payload,      
      } 
      return newState;
    }

    case CLEAR_DRIVER_INFO: {
      const newState = {
        ...state,
        driverInfo: {},
      } 
      return newState;
    }

//********* End Other Page/Form  ******************* */
//************************************************ */

    default:
      return state;
    }
}

export default reducer;