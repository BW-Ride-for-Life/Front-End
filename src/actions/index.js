// import delay from '../modules/delay';

export const LGIN_START = "LGIN_START";
export const LGIN_SUCC = "LGIN_SUCC";
export const LGIN_FAIL = "LGIN_FAIL";
export const LGIN_MOVE = "LGIN_MOVE"; // This will change the lgnMove state flag to true and casue a move from login page to 
                                      // landing page of mom/driver
export const LGIN_MOVE_CLR = "LGIN_MOVE_CLR"; //This clears the lgnMove state flag, once the move signal is received.


const delay_time = 1500;  //This is length of artificial delay time so that we can see different states


//Logs in the user
export function loginToServer(data) {
  return function(dispatch) {
    
    dispatch({type:LGIN_START});

    setTimeout(() => {
      switch(data) {
        case "mom":
          sessionStorage.setItem("token", "tokenForMom");
          sessionStorage.setItem("tokenType", "mom");

          dispatch({type:LGIN_SUCC});

          setTimeout(()=>{
            dispatch({type:LGIN_MOVE});
          },delay_time)

          break;
        case "driver":
          sessionStorage.setItem("token", "tokenForDrv");
          sessionStorage.setItem("tokenType", "driver");

          dispatch({type:LGIN_SUCC});

          setTimeout(()=>{
            dispatch({type:LGIN_MOVE});
          },delay_time)

          break;
        default:
          dispatch({type:LGIN_FAIL});
      }
    }, delay_time);
       

  };
}

export function clear_moveLoginToLanding() {
  return {
    type: LGIN_MOVE_CLR,
  };
}