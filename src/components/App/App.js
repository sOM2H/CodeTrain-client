import React, { Component } from 'react';
import Router from '../Router';
import Login from '../Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  state = {
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        {localStorage.getItem('authToken') ? <Router /> : <Login />}
      </div>
    )
  }
};
