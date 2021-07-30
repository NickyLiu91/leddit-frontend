import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import BigPost from './bigPost.js'

class BigComment extends React.Component {

  componentDidMount() {
    let commentId = this.props.match.url.slice(12)
    // console.log(commentId)

    fetch(`http://localhost:3000/api/v1/comments/${commentId}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      // this.props.changeSelectedPost(json)
    })
  }

  render () {
    return (
      <div>
      hi
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    selectedPost: state.selectedPostChanger.selectedPost,
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
