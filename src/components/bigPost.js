import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class BigPost extends React.Component {

  state = {
    comment: false,
    text: '',
    selectedComment: {}
  }

  selectComment = (comment) => {
    console.log('???')
    this.setState({
      selectedComment: comment
    })
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  cancel = (event) => {
    this.setState({
      comment: !this.state.comment
    })
  }

  postComment = (event) => {

    let currentComments = this.props.comments
    let currentPost = this.props.selectedPost

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
          post_id: this.props.selectedPost.id
      })
    })
    .then(r => r.json())
    .then(json => {
      currentPost.comments.push(json)
      this.props.changeComments([...currentComments, json])
      this.setState({comment: !this.state.comment})
    })
  }

  componentDidMount() {
    console.log(this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id))
  }

  seeAccount = (account) => {
    if (account.id == this.props.account.id) {
      this.props.history.push("/account")
    } else {
      this.props.changeSelectedAccount(account)
      this.props.history.push("otheraccount")
    }
  }

  render() {
    if (Object.keys(this.props.account).length == 0) {
      return (
        <div>
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <p onClick={() => {this.props.seeAccount(this.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} type="child"/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    } else {
      if (!this.state.comment) {
        return (
          <div>
            <div>
              <h1>{this.props.selectedPost.title}</h1>
              <p>{this.props.selectedPost.content}</p>
              <p onClick={() => {this.seeAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
              <button onClick={() => {this.setState({comment: !this.state.comment})}}>Comment</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} type="child" selectComment={this.selectComment} selectedComment={this.state.selectedComment}/>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div>
              <h1>{this.props.selectedPost.title}</h1>
              <p>{this.props.selectedPost.content}</p>
              <p onClick={() => {this.seeAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
              <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
              <br/>
              <button onClick={(event) => {this.postComment(event)}}>Comment</button>
              <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} type="child" />
                    )
                  }
                })
              }
            </div>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    selectedPost: state.selectedPostChanger.selectedPost,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(BigPost);
