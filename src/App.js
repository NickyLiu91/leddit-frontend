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
import CreatePost from './components/createPost.js';
// import NotFound from './components/notFound.js';

class App extends React.Component {

  state = {
    posts: false,
    comments: false,
    user: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    .then(json => {
      this.props.changePosts(json)
    })
    .then(res => {
      this.setState({
        posts: !this.state.posts
      })
    })

    fetch(`http://localhost:3000/api/v1/comments`)
    .then(res => res.json())
    .then(json => {this.props.changeComments(json)})
    .then(res => {
      this.setState({
        comments: !this.state.commentst
      })
    })

    if (localStorage.getItem('jwt')) {
      this.fetchCurrentUser()
    } else {
      this.setState({
        user: !this.state.user
      })
    }

    fetch(`http://localhost:3000/api/v1/commentvotes`)
    .then(res => res.json())

    fetch(`http://localhost:3000/api/v1/postvotes`)
    .then(res => res.json())
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
      this.props.changeAccount(json.account)
    })
    .then(res => {
      this.setState({
        user: !this.state.user
      })
    })
  }

  render() {
    if (this.state.posts && this.state.comments && this.state.user) {
      return(
        <div>
          <Nav />
          <div id="body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogInPage} />
              <Route path="/posts" component={Posts} />
              <Route path="/bigpost/:id" component={BigPost} />
              <Route path="/createpost" component={CreatePost} />
              <Route path="/account/:id" component={Account} />
            </Switch>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          Loading
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsChanger.posts,
    account: state.accountChanger.account,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(App);
