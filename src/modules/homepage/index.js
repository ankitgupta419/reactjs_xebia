import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Homepage from './components/Homepage';
const homeManagement = (	
	<Route path = "/homepage/:username" component = {Homepage}>
	   <IndexRoute component={Homepage} />
	</Route>
	
);
export default homeManagement;
