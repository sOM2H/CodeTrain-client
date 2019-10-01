import React from 'react'
import Task from '../Task';
import Tasks from '../Tasks';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';


const Router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={() => ([])}/>    
        <Route exact path='/tasks' component={Tasks} />
        <Route path='/tasks/:task' component={Task} />
        <Redirect to='/'/>
        </Switch>
    </BrowserRouter>
  )
}

export default Router;