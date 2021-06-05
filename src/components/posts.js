import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Posts extends React.Component {

  generatePosts = () => {
    let list = this.props.posts

    return list.map(
      post => <Post post={post} key={post.id} selectBigPost={this.selectBigPost} seeOtherAccount={this.seeOtherAccount}/>
    )
  }

  selectBigPost = (post) => {
    this.props.changeSelectedPost(post)
    // localStorage.setItem('selectedPost', JSON.stringify(post))
    this.props.history.push("bigpost")
  }

  seeOtherAccount = (account) => {
    this.props.changeSelectedAccount(account)
    localStorage.setItem('otherAccount', JSON.stringify(account))
    this.props.history.push("otheraccount")
  }

  render() {
    return (
      <div>
        {this.generatePosts()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsChanger.posts,
    selectedPost: state.selectedPostChanger.selectedPost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Posts);
