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
    selectedCommentReason: ''
  }

  componentDidMount() {
    let postId = this.props.match.url.slice(9)

    fetch(`http://localhost:3000/api/v1/posts/${postId}`)
    .then(res => res.json())
    .then(json => {
      this.props.changeSelectedPost(json)
    })
  }

  replyComment = (comment) => {
    console.log(comment)
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
      this.setState({
        comment: !this.state.comment,
        text: ''
      })
    })
  }

  selectAccount = (account) => {
    if (account.id == this.props.account.id) {
      this.props.history.push("/account")
    } else {
      this.props.changeSelectedAccount(account)
      this.props.history.push(`/otheraccount/${account.id}`)
    }
  }

  edit = () => {
    this.setState({
      edit: !this.state.edit,
      editText: this.props.selectedPost.content,
      editTitle: this.props.selectedPost.title
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

    let currentPost = this.props.selectedPost

    fetch(`http://localhost:3000/api/v1/posts/${currentPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        title: this.state.editTitle,
        content: this.state.editText
      })
    })
    .then(r => r.json())
    .then(json => {

      let allPosts = this.props.posts

      let oldPostPosition = allPosts.findIndex(post => post.id == json.id)
      allPosts[oldPostPosition] = json

      this.props.changeSelectedPost(json)
      this.props.changePosts(allPosts)

      this.setState({
        edit: !this.state.edit
      })
    })
  }

  render() {
    if (!this.props.selectedPost.account) {
      {/*Display loading screen if post's account not gotten yet*/}
      return(
        <div>
        Loading
        </div>
      )
    } else if (Object.keys(this.props.account).length == 0) {
      {/*Display without interaction options if not loggedin*/}
      return (
        <div>
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} type="child" selectedComment={this.state.selectedComment} stateComment={this.state.comment} stateEdit={this.state.edit}/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    } else if (Object.keys(this.state.selectedComment).length != 0) {
      {/*If a comment is selected for any reason do not show ability to interact with main post*/}
      return (
        <div>
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} type="child" cancel={this.cancel} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                    stateComment={this.state.comment} stateEdit={this.state.edit}/>
                  )
                }
              })
            }
          </div>
        </div>
      )
    } else if (this.props.selectedPost.account.id == this.props.account.id && this.state.comment == false) {
      {/*Display if loggedin to post's account*/}
      if (!this.state.edit) {
        {/*Display all options if not currently editing main post and using same account*/}
        return (
          <div>
            <div>
              <h1>{this.props.selectedPost.title}</h1>
              <p>{this.props.selectedPost.content}</p>
              <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
              <button onClick={() => {this.setState({comment: !this.state.comment})}}>Comment</button>
              <br/>
              <button onClick={(event) => {this.edit(event)}}>Edit</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} type="child" cancel={this.cancel} replyComment={this.replyComment} editComment={this.editComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                      stateComment={this.state.comment} stateEdit={this.state.edit}/>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      } else {
        {/*Display fields to edit if editing main post using same account*/}
        return (
          <div>
            <div>
              <input type="text" value={this.state.editTitle} onChange={event => this.handleEditTitle(event)}/>
              <br/>
              <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}>{this.state.editText}</textarea>
              <p>{this.props.selectedPost.account.name}</p>
              <br/>
              <button onClick={(event) => {this.submitBigPostEdit(event)}}>Submit</button>
              <button onClick={(event) => {this.setState({edit: !this.state.edit, editText: this.props.selectedPost.content})}}>Cancel</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} type="child" replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                      stateComment={this.state.comment} stateEdit={this.state.edit}/>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      }
    } else {
      {/*Display in all other situation*/}
      if (Object.keys(this.state.selectedComment).length == 0 && this.state.comment == false) {
        {/*If not post's account, no comment is selected, and not commenting on main post show ability to comment on main post*/}
        return (
          <div>
            <div>
              <h1>{this.props.selectedPost.title}</h1>
              <p>{this.props.selectedPost.content}</p>
              <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
              <button onClick={() => {this.setState({comment: !this.state.comment, selectedCommentReason: ''})}}>Comment</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} type="child" replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason} editComment={this.editComment}
                      stateComment={this.state.comment} stateEdit={this.state.edit}/>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      } else {
        {/*Display if commenting on a post*/}
        return (
          <div>
          ccc
            <div>
              <h1>{this.props.selectedPost.title}</h1>
              <p>{this.props.selectedPost.content}</p>
              <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
              <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
              <br/>
              <button onClick={(event) => {this.postComment(event)}}>Comment</button>
              <button onClick={(event) => {this.setState({comment: !this.state.comment, text: ''})}}>Cancel</button>
            </div>
            <br/>
            <div>
              {
                this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                  if (!comment.parent) {
                    return(
                      <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} cancel={this.cancel} type="child" selectedCommentReason={this.state.selectedCommentReason}
                      stateComment={this.state.comment} stateEdit={this.state.edit}/>
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
    posts: state.postsChanger.posts,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(BigPost);
