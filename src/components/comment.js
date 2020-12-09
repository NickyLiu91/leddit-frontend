import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
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
    this.replyComment()
    // this.setState({
    //   reply: !this.state.reply
    // })
  }

  cancel = (event) => {
    this.setState({
      reply: !this.state.reply
    })
  }

  replyComment = (event) => {

    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
          content: this.state.text,
          account_id: this.props.account.id,
          post_id: this.props.selectedPost.id,
          parent_id: this.props.comment.id
      })
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
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
              <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
            </li>
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    selectedPost: state.selectedPostChanger.selectedPost
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps)
)(Comment);
