import React, { Fragment } from "react";
import {
	BrowserRouter,
	Routes, // instead of "Switch"
	Route,
} from "react-router-dom";
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
import "./App.css";


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
									<Route exact path='/' element={<Home />} />
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