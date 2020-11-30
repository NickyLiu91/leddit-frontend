import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Nav from './components/nav.js';
import Home from './components/home.js';
import LogInPage from './components/logInPage.js';
import Posts from './components/posts.js';
import BigPost from './components/bigPost.js';
import Account from './components/account.js';
import OtherAccount from './components/otherAccount.js';
import CreatePost from './components/createPost.js';
// import NotFound from './components/notFound.js';

class App extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    .then(json => {this.props.changePosts(json)})

    if (localStorage.getItem('jwt')) {
      this.fetchCurrentUser()
    }
    console.log(localStorage.getItem('jwt'))
  }

  fetchCurrentUser = () => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      this.props.changeAccount(json.account)
    })
  }

  render() {
    return(
      <div>
        <Nav />
        <br/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LogInPage} />
          <Route path="/posts" component={Posts} />
          <Route path="/bigpost" component={BigPost} />
          <Route path="/createpost" component={CreatePost} />
          <Route path="/account" component={Account} />
          <Route path="/otheraccount" component={OtherAccount} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsChanger.posts,
    account: state.accountChanger.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(App);
