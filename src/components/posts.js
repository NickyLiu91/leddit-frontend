import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Posts extends React.Component {

  generatePosts = () => {
    let list = this.props.posts

    return list.map(
      post => {
        if (!post.deleted){
          return <Post key={post.id} post={post}/>
        }
      }
    )
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
    posts: state.postsChanger.posts
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps)
)(Posts);
