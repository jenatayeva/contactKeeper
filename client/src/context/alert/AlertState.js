import React, {useReducer} from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { v4 } from 'uuid'
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types' 

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timeout=5000) => {
    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
  }
  return(

    // entire app da stating accessible bolmasyny saglayar
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children} 
    {/*ichine goyulyan componentlary pass edyar*/}
    </AlertContext.Provider>
  )
}

export default AlertState;