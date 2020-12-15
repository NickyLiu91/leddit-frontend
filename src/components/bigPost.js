import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class BigPost extends React.Component {

  state = {
    comment: false,
    text: ''
  }

  // displayComments = () => {
  //   let list = this.props.selectedPost.comments
  //
  //   // return list.map(
  //   //   comment => {
  //   //     if (!comment.parent){
  //   //       if (comment.children.length != 0){
  //   //         console.log(comment.children)
  //   //         // return comment.children.filter(
  //   //         //   comment => {return <Comment key={comment.id} comment={comment} />}
  //   //         // )
  //   //       }
  //   //       return <Comment key={comment.id} comment={comment} />
  //   //     }
  //   //   }
  //   // )
  //
  //   list.forEach(comment => {displayComments2(comment)})
  // }

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

  render() {
    return (
      <div>
        {
          this.props.selectedPost.comments.map(comment => {
            return(
              <Comment key={comment.id} comment={comment} type="child"/>
            )
          })
        }
      </div>
    )
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
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(BigPost);
