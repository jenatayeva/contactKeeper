import React, {useReducer} from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types' 

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'), //vanillia js 
    isAuthenticated: null,
    user: null,
    loading: true, //until we make a request and we get response back then we will make false
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load user check in which user is loged in
  const loadUser = async() => {
    //@todo-load token into global headers 
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (error) {
      dispatch({type: AUTH_ERROR})
    }
  };

  //register user signed a user back get a token
  const register = async fromData => {
    const config = {
      headers: {
        'Content-Type': 'application/json' //sending a token with a headers to route 
      //but not for fetch contacts add contacts 
      }
    }
    try {
      const res = await axios.post('/api/users', fromData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
  }}

  //login a user get the token
  const login = async fromData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(fromData);
    try {
      const res = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
  }}
  //logout destroy the token 
  const logout = () => dispatch ({ type: LOGOUT })
  //clear error to clear any error
  const clearError = () => dispatch({type: CLEAR_ERRORS})
  return(

    // entire app da stating accessible bolmasyny saglayar
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
        clearError
      }}
    >
      {props.children} 
    {/*ichine goyulyan componentlary pass edyar*/}
    </AuthContext.Provider>
  )
}

export default AuthState;