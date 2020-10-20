import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {compose} from 'redux';
import store from './index.js';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Nav from './components/nav.js';
import LogIn from './components/logIn.js';
import Profile from './components/profile.js';
import NotFound from './components/notFound.js';

  class App extends React.Component {

    componentDidMount() {
      fetch(`http://localhost:3000/api/v1/posts`)
      .then(res => res.json())
      .then(json => {this.props.changePosts(json)})
    }

    render(){
      return (
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
  }

// const mapStateToProps = state => {
//   return {
//     posts: state.postsChanger.posts,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
  }
}

export default compose(
  withRouter,
  connect(
  // mapStateToProps,
  mapDispatchToProps)
)(App);
