import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Admin from '../pages/Admin';
import EditProject from '../pages/EditProject';
import '../styles/Main.css';


function Main () {
  return (
    <div className="main-container">
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/a-propos'><About /></Route>
          <Route exact path='/projets'><Projects /></Route>
          <Route exact path='/admin/edit/:id'><EditProject /></Route>
          <Route exact path='/admin'><Admin /></Route>
        </Switch>
    </div>
  );
}

export default Main;