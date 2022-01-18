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

      this.props.changeSelectedPost(json)
      this.props.changePosts(allPosts)
      this.props.changeComments(newComments)

      this.setState({
        edit: !this.state.edit
      })
    })
  }

  deleteBigPost = (event) => {

    let currentPost = this.props.selectedPost

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

      this.props.changeSelectedPost(json)
      this.props.changePosts(allPosts)
      this.props.changeComments(newComments)
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
    } else if (this.props.selectedPost.deleted) {
      {/*Display loading screen if post was deleted*/}
      return (
        <div>
          <div>
            <h1>Deleted</h1>
            <p>Deleted</p>
            <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
            <p>Deleted at: {this.props.selectedPost.updated_at.slice(0, -14)}</p>
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
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
            <br/>
            <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}>{this.state.editText}</textarea>
            <p>{this.props.selectedPost.account.name}</p>
            <br/>
            <button onClick={(event) => {this.submitBigPostEdit(event)}}>Submit</button>
            <button onClick={(event) => {this.setState({edit: !this.state.edit, editText: this.props.selectedPost.content})}}>Cancel</button>
            <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
            {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
                if (!comment.parent) {
                  return(
                    <Comment key={comment.id} comment={comment} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
                    stateComment={this.state.comment} cancel={this.cancel}/>
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
        ccc
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
            <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
            <br/>
            <button onClick={(event) => {this.postComment(event)}}>Comment</button>
            <button onClick={(event) => {this.setState({comment: !this.state.comment, text: ''})}}>Cancel</button>
            <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
            {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
          </div>
          <br/>
          <div>
            {
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
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
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
            {Object.keys(this.props.account).length != 0 ? <button onClick={() => {this.setState({comment: !this.state.comment, selectedCommentReason: ''})}}>Comment</button> : null}
            {/*display comment button if loggedin*/}
            {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
            <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
            {this.props.selectedPost.account.id == this.props.account.id && this.state.comment == false ?
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
              this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
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

    // else if (Object.keys(this.props.account).length == 0) {
    //   {/*Display without interaction options if not loggedin*/}
    //   return (
    //     <div>
    //       <div>
    //         <h1>{this.props.selectedPost.title}</h1>
    //         <p>{this.props.selectedPost.content}</p>
    //         <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
    //         <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
    //         {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
    //       </div>
    //       <br/>
    //       <div>
    //         {
    //           this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
    //             if (!comment.parent) {
    //               return(
    //                 <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} stateComment={this.state.comment} stateEdit={this.state.edit}/>
    //               )
    //             }
    //           })
    //         }
    //       </div>
    //     </div>
    //   )
    // } else if (Object.keys(this.state.selectedComment).length != 0) {
    //   {/*If a comment is selected for any reason do not show ability to interact with main post*/}
    //   return (
    //     <div>
    //       <div>
    //         <h1>{this.props.selectedPost.title}</h1>
    //         <p>{this.props.selectedPost.content}</p>
    //         <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
    //         <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
    //         {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
    //       </div>
    //       <br/>
    //       <div>
    //         {
    //           this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
    //             if (!comment.parent) {
    //               return(
    //                 <Comment key={comment.id} comment={comment} cancel={this.cancel} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
    //                 stateComment={this.state.comment} stateEdit={this.state.edit}/>
    //               )
    //             }
    //           })
    //         }
    //       </div>
    //     </div>
    //   ) ?????????????????
    // } else if (this.props.selectedPost.account.id == this.props.account.id && this.state.comment == false) {
    //   {/*Display if loggedin to post's account*/}
    //   if (!this.state.edit) {
    //     {/*Display all options if not currently editing main post and using same account*/}
    //     return (
    //       <div>
    //         <div>
    //           <h1>{this.props.selectedPost.title}</h1>
    //           <p>{this.props.selectedPost.content}</p>
    //           <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
    //           <button onClick={() => {this.setState({comment: !this.state.comment})}}>Comment</button>
    //           <br/>
    //           <button onClick={(event) => {this.edit(event)}}>Edit</button>
    //           <br/>
    //           <button onClick={(event) => {this.deleteBigPost(event)}}>Delete</button>
    //           <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
    //           {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
    //         </div>
    //         <br/>
    //         <div>
    //           {
    //             this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
    //               if (!comment.parent) {
    //                 return(
    //                   <Comment key={comment.id} comment={comment} cancel={this.cancel} replyComment={this.replyComment} editComment={this.editComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
    //                   stateComment={this.state.comment} stateEdit={this.state.edit}/>
    //                 )
    //               }
    //             })
    //           }
    //         </div>
    //       </div>
    //     )
    //   } else {
      //   {/*Display fields to edit if editing main post using same account*/}
      //   return (
      //     <div>
      //       <div>
      //         <input type="text" value={this.state.editTitle} onChange={event => this.handleEditTitle(event)}/>
      //         <br/>
      //         <textarea value={this.state.editText} onChange={event => this.handleEditText(event)}>{this.state.editText}</textarea>
      //         <p>{this.props.selectedPost.account.name}</p>
      //         <br/>
      //         <button onClick={(event) => {this.submitBigPostEdit(event)}}>Submit</button>
      //         <button onClick={(event) => {this.setState({edit: !this.state.edit, editText: this.props.selectedPost.content})}}>Cancel</button>
      //         <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
      //         {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
      //       </div>
      //       <br/>
      //       <div>
      //         {
      //           this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
      //             if (!comment.parent) {
      //               return(
      //                 <Comment key={comment.id} comment={comment} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason}
      //                 stateComment={this.state.comment} stateEdit={this.state.edit}/>
      //               )
      //             }
      //           })
      //         }
      //       </div>
      //     </div>
      //   )
      // }
    // } else {
    //   {/*Display in all other situation*/}
    //   if (Object.keys(this.state.selectedComment).length == 0 && this.state.comment == false) {
    //     {/*If not post's account, no comment is selected, and not commenting on main post show ability to comment on main post*/}
    //     return (
    //       <div>
    //         <div>
    //           <h1>{this.props.selectedPost.title}</h1>
    //           <p>{this.props.selectedPost.content}</p>
    //           <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
    //           <button onClick={() => {this.setState({comment: !this.state.comment, selectedCommentReason: ''})}}>Comment</button>
    //           <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
    //           {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
    //         </div>
    //         <br/>
    //         <div>
    //           {
    //             this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
    //               if (!comment.parent) {
    //                 return(
    //                   <Comment key={comment.id} comment={comment} replyComment={this.replyComment} selectedComment={this.state.selectedComment} selectedCommentReason={this.state.selectedCommentReason} editComment={this.editComment}
    //                   stateComment={this.state.comment} stateEdit={this.state.edit}/>
    //                 )
    //               }
    //             })
    //           }
    //         </div>
    //       </div>
    //     )
    //   } else {
  //       {/*Display if commenting on a post*/}
  //       return (
  //         <div>
  //         ccc
  //           <div>
  //             <h1>{this.props.selectedPost.title}</h1>
  //             <p>{this.props.selectedPost.content}</p>
  //             <p onClick={() => {this.selectAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
  //             <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
  //             <br/>
  //             <button onClick={(event) => {this.postComment(event)}}>Comment</button>
  //             <button onClick={(event) => {this.setState({comment: !this.state.comment, text: ''})}}>Cancel</button>
  //             <p>Created at: {this.props.selectedPost.created_at.slice(0, -14)}</p>
  //             {this.props.selectedPost.edited ? <p>Updated at: {this.props.selectedPost.updated_at.slice(0, -14)}</p> : null}
  //           </div>
  //           <br/>
  //           <div>
  //             {
  //               this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
  //                 if (!comment.parent) {
  //                   return(
  //                     <Comment key={comment.id} comment={comment} selectedComment={this.state.selectedComment} cancel={this.cancel} selectedCommentReason={this.state.selectedCommentReason}
  //                     stateComment={this.state.comment} stateEdit={this.state.edit}/>
  //                   )
  //                 }
  //               })
  //             }
  //           </div>
  //         </div>
  //       )
  //     }
  //   }
  // }

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
