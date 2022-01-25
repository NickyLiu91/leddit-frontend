import React from 'react';
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class BigPost extends React.Component {

  state = {
    comment: false,
    text: '',
    selectedComment: {},
    edit: false,
    editText: '',
    editTitle: '',
    selectedCommentReason: '',
    pagePost: {}
  }

  componentDidMount() {
    let postId = this.props.match.url.slice(9)

    fetch(`http://localhost:3000/api/v1/posts/${postId}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        pagePost: json
      })
    })
  }

  replyComment = (comment) => {
    this.setState({
      selectedComment: comment,
      selectedCommentReason: 'reply'
    })
  }

  editComment = (comment) => {
    this.setState({
      selectedComment: comment,
      selectedCommentReason: 'edit'
    })
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  cancel = (event) => {
    this.setState({
      selectedComment: {},
      selectedCommentReason: ''
    })
  }

  postComment = (event) => {

    let currentComments = this.props.comments
    let currentPost = this.state.pagePost

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
          post_id: this.state.pagePost.id
      })
    })
    .then(r => r.json())
    .then(json => {
      currentPost.comments.push(json)
      this.props.changeComments([...currentComments, json])
      this.setState({
        comment: !this.state.comment,
        text: ''
      })
    })
  }

  selectAccount = (account) => {
    this.props.history.push(`/account/${account.id}`)
  }

  edit = () => {
    this.setState({
      edit: !this.state.edit,
      editText: this.state.pagePost.content,
      editTitle: this.state.pagePost.title
    })
  }

  handleEditText = (event) => {
    this.setState({
      editText: event.target.value
    })
  }

  handleEditTitle = (event) => {
    this.setState({
      editTitle: event.target.value
    })
  }

  submitBigPostEdit = (event) => {

    let currentPost = this.state.pagePost

    fetch(`http://localhost:3000/api/v1/posts/${currentPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        title: this.state.editTitle,
        content: this.state.editText,
        edited: true
      })
    })
    .then(r => r.json())
    .then(json => {

      let allPosts = this.props.posts

      let oldPostPosition = allPosts.findIndex(post => post.id == json.id)
      allPosts[oldPostPosition] = json

      let allOldComments = this.props.comments
      let newComments = allOldComments.map(comment => {
        if (comment.post.id == json.id) {
          let newComment = comment
          newComment.post = json
          return newComment
        } else {
          return comment
        }
      })

      this.props.changePosts(allPosts)
      this.props.changeComments(newComments)

      this.setState({
        edit: !this.state.edit,
        pagePost: json
      })
    })
  }

  deleteBigPost = (event) => {

    let currentPost = this.state.pagePost

    fetch(`http://localhost:3000/api/v1/posts/${currentPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        title: null,
        content: null,
        deleted: true
      })
    })
    .then(r => r.json())
    .then(json => {

      let allPosts = this.props.posts

      let oldPostPosition = allPosts.findIndex(post => post.id == json.id)
      allPosts[oldPostPosition] = json

      let allOldComments = this.props.comments
      let newComments = allOldComments.map(comment => {
        if (comment.post.id == json.id) {
          let newComment = comment
          newComment.post = json
          return newComment
        } else {
          return comment
        }
      })

      this.props.changePosts(allPosts)
      this.props.changeComments(newComments)

      this.setState({
        pagePost: json
      })
    })
  }

  render() {
   if (!this.state.pagePost.account) {
      {/*Display loading screen if post's account not gotten yet*/}
      return(
        <div>
        Loading
        </div>
      )
    } else if (this.state.pagePost.deleted) {
      {/*Display loading screen if post was deleted*/}
      return (
        <div>
          <div>
            <h1>Deleted</h1>
            <p>Deleted</p>
            <p>Created at: {this.state.pagePost.created_at.slice(0, -14)}</p>
            <p>Deleted at: {this.state.pagePost.updated_at.slice(0, -14)}</p>
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.state.pagePost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} stateComment={this.state.comment} stateEdit={this.state.edit}/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    } else if (this.state.edit) {
      return (
        <div>
          <div>
            <input type="text" value={this.state.editTitle} onChange={event => this.handleEditTitle(event)}/>
            <p onClick={() => {this.selectAccount(this.state.pagePost.account)}}>Submitted on {this.state.pagePost.created_at.slice(0, -14)} by {this.state.pagePost.account.name}</p>
            <br/>
            <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}>{this.state.editText}</textarea>
            <p>{this.state.pagePost.account.name}</p>
            <br/>
            <button onClick={(event) => {this.submitBigPostEdit(event)}}>Submit</button>
            <button onClick={(event) => {this.setState({edit: !this.state.edit, editText: this.state.pagePost.content})}}>Cancel</button>
            {this.state.pagePost.edited ? <p>Updated at: {this.state.pagePost.updated_at.slice(0, -14)}</p> : null}
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.state.pagePost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                    stateComment={this.state.comment} stateEdit={this.state.edit} cancel={this.cancel}/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    } else if (this.state.comment) {
      return (
        <div>
          <div>
            <h1>{this.state.pagePost.title}</h1>
            <p onClick={() => {this.selectAccount(this.state.pagePost.account)}}>Submitted on {this.state.pagePost.created_at.slice(0, -14)} by {this.state.pagePost.account.name}</p>
            <p>{this.state.pagePost.content}</p>
            {this.state.pagePost.edited ? <p>Updated at: {this.state.pagePost.updated_at.slice(0, -14)}</p> : null}
          </div>
          <div id='postComment'>
            <textarea id='postCommentTextArea'value={this.state.text} onChange={event => this.handleText(event)}></textarea>
            <br/>
            <button onClick={(event) => {this.postComment(event)}}>Comment</button>
            <button onClick={(event) => {this.setState({comment: !this.state.comment, text: ''})}}>Cancel</button>
          </div>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.state.pagePost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} cancel={this.cancel} selectedCommentReason={this.state.selectedCommentReason}
                    stateComment={this.state.comment} stateEdit={this.state.edit} cancel={this.cancel}/>
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
            <h1>{this.state.pagePost.title}</h1>
            <p onClick={() => {this.selectAccount(this.state.pagePost.account)}}>Submitted on {this.state.pagePost.created_at.slice(0, -14)} by {this.state.pagePost.account.name}</p>
            <p>{this.state.pagePost.content}</p>
            {Object.keys(this.props.account).length != 0  && this.state.selectedCommentReason == '' ? <button onClick={() => {this.setState({comment: !this.state.comment, selectedCommentReason: ''})}}>Comment</button> : null}
            {/*display comment button if loggedin*/}
            {this.state.pagePost.edited ? <p>Updated at: {this.state.pagePost.updated_at.slice(0, -14)}</p> : null}
            {this.state.pagePost.account.id == this.props.account.id && this.state.comment == false && this.state.selectedCommentReason == '' ?
              <div>
              <br/>
              <button onClick={(event) => {this.edit(event)}}>Edit</button>
              <br/>
              <button onClick={(event) => {this.deleteBigPost(event)}}>Delete</button>
              </div> : null
            }
            {/*if post belongs to current account and not editing display edit and delete button*/}
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.state.pagePost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                    stateComment={this.state.comment} stateEdit={this.state.edit} replyComment={this.replyComment} editComment={this.editComment} cancel={this.cancel}/>
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

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(BigPost);
