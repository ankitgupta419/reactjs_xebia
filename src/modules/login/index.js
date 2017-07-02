import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/Login';
const loginManagement = (	
	<Route path = "/login" component = {Login}>
	   <IndexRoute component={Login} />
	</Route>
	
);
export default loginManagement;
