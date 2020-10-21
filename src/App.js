import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Nav from './components/nav.js';
import LogIn from './components/logIn.js';
import Posts from './components/posts.js';
import NotFound from './components/notFound.js';

const App = props => {
  console.log(props)
  return(
    <div>
      <Nav />
      <br/>
      <Switch>
        // <Route exact path="/" render={() => <Redirect to="/login" />} />

        <Route exact path="/posts" component={Posts} />
        <Route exact path="/login" component={LogIn} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withRouter(App);
