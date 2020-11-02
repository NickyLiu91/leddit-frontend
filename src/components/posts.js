import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Posts extends React.Component {

  generatePosts = () => {
    let list = this.props.posts
    console.log(list)

    return list.map(
      post => <Post post={post} seeBigPost={this.seeBigPost}/>
    )
  }

  seeBigPost = () => {
    this.props.history.push("bigpost")
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
)(Posts);
