import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Comment extends React.Component {

  state = {
    reply: false
  }

  render() {
    if (!this.state.reply){
      return(
        <div className="post">
          <ul>
            <li>
              <p>{this.props.comment.content}</p>
              <button onClick={() => {this.setState({reply: !this.state.reply})}}>Reply</button>
            </li>
          </ul>
        </div>
      )
    } else {
      return(
        <div className="post">
          <ul>
            <li>
              <p>{this.props.comment.content}</p>
              <textarea></textarea>
              <br/>
              <button onClick={() => {this.setState({reply: !this.state.reply})}}>Reply</button>
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default Comment;
