import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class BigPost extends React.Component {

  displayComments = () => {
    let list = this.props.selectedPost.comments

    return list.map(
      comment => <Comment comment={comment} />
    )
  }

  render() {
    <div>
      <form onSubmit={this.createPost}>
        Title: <input id="title" type="text" value={this.state.title} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        Body: <textarea id="body" value={this.state.body} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        <button type="submit">Post</button>
      </form>
    </div>
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
  connect(mapStateToProps)
)(BigPost);
