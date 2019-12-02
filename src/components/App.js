import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import Navbar from './Navbar'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"


class App extends Component {

 render() {
    return (
      <Router>
      <Navbar />
       <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
  </Router>
    );
  }
}

export default App;
