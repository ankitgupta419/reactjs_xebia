import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Login from './src/components/Login'
import Homepage from './src/components/Homepage'
require("./css/style.css")
render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}>
    	<IndexRoute component={Login}/> 
      	<Route path="/login" component={Login}/>
    </Route>
    <Route path="/homepage/:username" component={Homepage} />
  </Router>
), document.getElementById('root'))
