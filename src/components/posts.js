import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Posts extends React.Component {

  generatePosts = () => {
    console.log(this.props.posts)
    let list = this.props.posts

    return list.map(
      post => <Post post={post} seeBigPost={this.seeBigPost}/>
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
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
    selectedPost: state.selectedPostChanger.selectedPost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Posts);
