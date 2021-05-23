import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Comment extends React.Component {

    state = {
      replyText: '',
      editText: this.props.comment.content
    }

    handleReplyText = (event) => {
      this.setState({
        replyText: event.target.value
      })
    }

    handleEditText = (event) => {
      this.setState({
        editText: event.target.value
      })
    }

    cancel = () => {
      this.setState({
        replyText: '',
        editText: this.props.comment.content
      }, () => {this.props.cancel()})
    }

  nestedComments = (comment, comments, source="comments") => {
    // let childComments = this.props.comments.filter(comment2 => comment2.parent.id == comment.id)
  let childComments = comments.filter(comment2 => {return comment2.parent && comment2.parent.id == comment.id})
    // if (comment.children) {
      return childComments.map(comment2 => {
        return <ConnectedComment key={comment2.id} comment={comment2} account={this.props.account} type="child"
        editComment={this.props.editComment} replyComment={this.props.replyComment} selectedComment={this.props.selectedComment}
        cancel={this.cancel} seeAccount={this.seeAccount} source={source} selectedCommentReason={this.props.selectedCommentReason}
        submitCommentEdit={this.submitCommentEdit}/>
      })
    // }
  }

  seeAccount = (account) => {
    if (account.id == this.props.account.id) {
      this.props.history.push("/account")
    } else {
      this.props.changeSelectedAccount(account)
      this.props.history.push("otheraccount")
    }
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  submitCommentEdit = (comment) => {

    let currentComment = comment

    fetch(`http://localhost:3000/api/v1/comments/${currentComment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        content: this.state.editText
      })
    })
    .then(r => r.json())
    .then(json => {
      this.setState({
        editText: json.content
      }, () => {this.props.cancel()})
    })
  }

  deleteComment = (comment) => {
    let currentComment = comment

    let currentComments = this.props.comments

    let newComments = currentComments.filter(item =>
      item.id != currentComment.id
    )

    fetch(`http://localhost:3000/api/v1/comments/${currentComment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }}
    ).then(res => {
      this.props.changeComments(newComments)
    })
  }

  render() {
    if (Object.keys(this.props.account).length == 0) {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.seeAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>

              {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.source == "account") {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.seeBigPost(this.props.comment.post)}}>Posted in: {this.props.comment.post.title}</p>
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.account.id == this.props.comment.account.id && this.props.selectedCommentReason == '' ) {
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.state.editText}</p>
                <p onClick={() => {this.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>
                <button onClick={(event) => {this.props.replyComment(this.props.comment)}}>Reply</button>
                <button onClick={(event) => {this.props.editComment(this.props.comment)}}>Edit</button>
                <button onClick={(event) => {this.deleteComment(this.props.comment)}}>Delete</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.account.id == this.props.comment.account.id && this.props.comment.id == this.props.selectedComment.id && this.props.selectedCommentReason == 'edit') {
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}></textarea>
                <p onClick={() => {this.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>
                <br/>
                <button onClick={(event) => {this.submitCommentEdit(this.props.comment)}}>Edit</button>
                <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.comment.id == this.props.selectedComment.id && this.props.selectedCommentReason == 'reply') {
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.state.editText}</p>
                <p onClick={() => {this.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>
                <textarea value={this.state.replyText} onChange={event => this.handleReplyText(event)}></textarea>
                <br/>
                <button onClick={(event) => {this.props.replyComment(this.props.comment)}}>Reply</button>
                <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.selectedCommentReason != '') {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.seeAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>

              {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.seeAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>

              <button onClick={() => {this.props.replyComment(this.props.comment)}}>Reply</button>
              {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
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
    selectedPost: state.selectedPostChanger.selectedPost,
    comments: state.commentsChanger.comments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event})
  }
}

const ConnectedComment = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Comment)

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Comment);
