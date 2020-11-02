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
    if (Object.keys(this.props.selectedPost).length != 0) {
      console.log(this.props.selectedPost)
      return (
        <div>
          <h1>{this.props.selectedPost.title}</h1>
          <p>{this.props.selectedPost.content}</p>
          {this.displayComments()}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    selectedPost: state.selectedPostChanger.selectedPost
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps)
)(BigPost);
