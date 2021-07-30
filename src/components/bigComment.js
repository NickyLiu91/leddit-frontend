import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import BigPost from './bigPost.js'
import Comment from './comment.js'

class BigComment extends React.Component {

  componentDidMount() {
    let commentId = this.props.match.url.slice(12)
    // console.log(commentId)

    fetch(`http://localhost:3000/api/v1/comments/${commentId}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.props.changeSelectedComment(json)
    })
  }

  render () {
    if (!this.props.selectedComment.post) {
      return(
        <div>
        Loading
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.selectedComment.post.title}</h1>
          <h1>{this.props.selectedComment.post.content}</h1>
          <p onClick={() => {this.seeAccount(this.props.selectedComment.post.account)}}>{this.props.selectedComment.post.account.name}</p>
        </div>
      )
    }
  }
}

// <div>
//   <p onClick={() => {this.seeAccount(this.props.selectedPost.account)}}>{this.props.selectedPost.account.name}</p>
// </div>
// <br/>
// <div>
//   {
//     this.props.comments.filter(comment => comment.post.id == this.props.selectedPost.id).map(comment => {
//       if (!comment.parent) {
//         return(
//           <Comment key={comment.id} comment={comment} type="child" selectedComment={this.state.selectedComment} />
//         )
//       }
//     })
//   }
// </div>

const mapStateToProps = state => {
  return {
    selectedComment: state.selectedCommentChanger.selectedComment,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedComment: (event) => dispatch({type: 'CHANGE_SELECTEDCOMMENT', selectedComment: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(BigComment);
