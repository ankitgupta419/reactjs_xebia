import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import homepage from './../homepage/';
import login from './../login/';
const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
        { homepage }
        { login } 
    </Route>
);
export default routes;