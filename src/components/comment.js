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
        cancel={this.cancel} selectAccount={this.selectAccount} source={source} selectedCommentReason={this.props.selectedCommentReason}
        submitCommentEdit={this.submitCommentEdit} stateComment={this.props.stateComment} stateEdit={this.props.stateEdit}/>
      })
    // }
  }

  selectAccount = (account) => {
    if (account.id == this.props.account.id) {
      this.props.history.push("/account")
    } else {
      this.props.changeSelectedAccount(account)
      this.props.history.push(`/otheraccount/${account.id}`)
    }
  }

  selectBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push(`/bigpost/${post.id}`)
  }

  submitCommentEdit = (comment) => {

    let currentComment = comment
    let currentComments = this.props.comments
    console.log(currentComments)
    let currentPost = this.props.selectedPost
    console.log(comment)

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
      let newText = json.content
      let newArray = currentComments.map(function(item){
        if (item.id == comment.id) {
          item.content = newText
          return item
        } else {
          return item
        }
      })
      this.props.changeComments(newArray)
      this.props.cancel()
    })
  }

  submitCommentReply = (event) => {

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
          content: this.state.replyText,
          account_id: this.props.account.id,
          post_id: this.props.selectedPost.id,
          parent_id: this.props.comment.id
      })
    })
    .then(r => r.json())
    .then(json => {
      currentPost.comments.push(json)
      this.props.changeComments([...currentComments, json])
      this.props.cancel()
    })
  }

  // deleteComment = (comment) => {
  //   let currentComment = comment
  //
  //   let currentComments = this.props.comments
  //
  //   let newComments = currentComments.filter(item =>
  //     item.id != currentComment.id
  //   )
  //
  //   fetch(`http://localhost:3000/api/v1/comments/${currentComment.id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  //     }}
  //   ).then(res => {
  //     this.props.changeComments(newComments)
  //   })
  // }

  deleteComment = (comment) => {
    let currentComment = comment
    let currentComments = this.props.comments

    let currentPost = this.props.selectedPost


    fetch(`http://localhost:3000/api/v1/comments/${currentComment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        content: null,
        deleted: true
      })
    })
    .then(r => r.json())
    .then(json => {

      let newArray = currentComments.map(function(item){
        if (item.id == comment.id) {
          return json
        } else {
          return item
        }
      })
      this.props.changeComments(newArray)
    })
  }

  render() {
    if (this.props.comment.deleted == true) {
      {/*Display if comment is deleted*/}
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>Deleted</p>
              {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.source == "account") {
      {/*Display all in a list without indents if being displayed from the account page*/}
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.selectBigPost(this.props.comment.post)}}>Posted in: {this.props.comment.post.title}</p>
              </div>
            </li>
          </ul>
        </div>
      )
    } else if ((this.props.comment.id != this.props.selectedComment.id && this.props.selectedCommentReason != '') || (this.props.stateComment || this.props.stateEdit || Object.keys(this.props.account).length == 0)) {
      {/*Display without any options if either a different comment is currently selected for a reason or if the main post is being edited or commented on or if not loggedin*/}
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.state.editText}</p>
                <p onClick={() => {this.selectAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.account.id == this.props.comment.account.id && this.props.comment.id == this.props.selectedComment.id && this.props.selectedCommentReason == 'edit') {
      {/*Display if this is this comment is being edited by the comment's account*/}
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}></textarea>
                <p onClick={() => {this.selectAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>
                <br/>
                <button onClick={(event) => {this.submitCommentEdit(this.props.comment)}}>Edit</button>
                <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if ((this.props.comment.id == this.props.selectedComment.id && this.props.selectedCommentReason == 'reply') ) {
      {/*Display if this comment is being replied to*/}
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.state.editText}</p>
                <p onClick={() => {this.selectAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>
                <textarea value={this.state.replyText} onChange={event => this.handleReplyText(event)}></textarea>
                <br/>
                <button onClick={(event) => {this.submitCommentReply(event)}}>Reply</button>
                <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.account.id == this.props.comment.account.id) {
      {/*Display option to edit or reply if this is the comment's account*/}
      return(
        <div className="post">
          <ul>
            <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.state.editText}</p>
                <p onClick={() => {this.selectAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>
                <button onClick={(event) => {this.props.replyComment(this.props.comment)}}>Reply</button>
                <button onClick={(event) => {this.props.editComment(this.props.comment)}}>Edit</button>
                <button onClick={(event) => {this.deleteComment(this.props.comment)}}>Delete</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else {
      {/*Display option to comment if unrelated account and nothing else is selected*/}
      {console.log(this.props.comment)}
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.state.editText}</p>
              <p onClick={() => {this.selectAccount(this.props.comment.account)}}>{this.props.comment.account.name}</p>
              <p>Created at:{this.props.comment.created_at}</p>
              <p>Updated at:{this.props.comment.updated_at}</p>

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
