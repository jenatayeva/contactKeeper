import React, { Fragment } from "react";
import {
	BrowserRouter,
	Routes, // instead of "Switch"
	Route,
} from "react-router-dom";
import axios from 'axios'
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

if(localStorage.token){
	setAuthToken(localStorage.token)
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<BrowserRouter>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alerts/>
								<Routes>
									<Route element={<PrivateRoute/>}>
										<Route exact path='/' element={<Home/>}/>
									</Route>
            			{/* <Route exact path='/' element={<PrivateRoute ><Home/></PrivateRoute>}/> */}
									<Route exact path='/about' element={<About />} />
									<Route exact path='/register' element={<Register />} />
									<Route exact path='/login' element={<Login />} />
								</Routes>
							</div>
						</Fragment>
					</BrowserRouter>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
