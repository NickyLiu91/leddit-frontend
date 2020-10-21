import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Nav from './components/nav.js';
import Home from './components/home.js';
import LogIn from './components/logIn.js';
import Posts from './components/posts.js';
// import NotFound from './components/notFound.js';

class App extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    // .then(json => console.log(this.props.changePosts))
    .then(json => {this.props.changePosts(json)})
  }

  render() {
    return(
      <div>
        <Nav />
        <br/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/posts" component={Posts} />

        </Switch>
      </div>
    )
  }
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
