import React, {useContext} from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = () => {//private route component create
  const authContext = useContext(AuthContext);

  const {isAuthenticated, loading} = authContext;

  return (
    !isAuthenticated && !loading ? <Navigate to='/login'/> : <Outlet/>
  )
  // return (
  //   <Route { ...rest } element={ props => !isAuthenticated && !loading ?
  //   (<Navigate to='/login'/>) :
  //   (<Outlet/>)}/>
  // )
}

export default PrivateRoute
