import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Comment extends React.Component {

  state = {
    reply: false,
    text: ''
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value
    }, () => {console.log(this.state.text)})
  }

  handleSubmit = (event) => {
    this.setState({
      reply: !this.state.reply
    })
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
              <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
              <br/>
              <button onClick={(event) => {this.handleSubmit(event)}}>Reply</button>
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default Comment;
