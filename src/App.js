import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Nav from './components/nav.js';
import LogIn from './components/logIn.js';
import Profile from './components/profile.js';
import NotFound from './components/notFound.js';

  const App = props => {
    console.log(props)
    return(
      <div>
        <Nav />
        <br/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />

          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LogIn} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }

const mapStateToProps = state => {
  return {
    posts: state.postsChanger.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
  }
}

export default compose(
  withRouter,
  connect(
  mapStateToProps,
  mapDispatchToProps)
)(App);
