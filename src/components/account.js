import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
import Comment from './comment.js'

class Account extends React.Component {

  generateMyPosts = () => {
    let accountId = this.props.account.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => <Post key={post.id} post={post} seeBigPost={this.seeBigPost} seeOtherAccount={this.seeOtherAccount} />
    )
  }

  displayComments = () => {
    let list = this.props.comments

    return list.map(
      comment => <Comment comment={comment} />
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  seeOtherAccount = (account) => {
    console.log(account)
    this.props.changeSelectedAccount(account)
    this.props.history.push("otheraccount")
  }

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.changeAccount({})
    this.props.history.push("/login")
  }

  render() {
    return(
      <div>
        <div>
          Name: {this.props.account.name}
        </div>
        <br />
        <h1>Posts</h1>
        <div>
          {this.generateMyPosts()}
        </div>
        <br />
        <h1>Comments</h1>
        <div>
          {this.displayComments()}
        </div>
        <br />
        <button onClick={this.logOut}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts,
    comments: state.commentsChanger.comments,
    selectedPost: state.selectedPostChanger.selectedPost,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeComment: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Account);
