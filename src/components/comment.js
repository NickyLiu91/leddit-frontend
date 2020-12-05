import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Comment extends React.Component {

  render() {
    return(
      <div className="post">
      <ul>
      <li>
      <p>{this.props.comment.content}</p>
      <button>Reply</button>
      </li>
      </ul>
      </div>
    )
  }
}

export default Comment;
