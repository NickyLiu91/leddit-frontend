import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
import Comment from './comment.js'

class Account extends React.Component {

  componentDidMount() {
    if (!this.props.account) {
      this.props.history.push("/login")
    }
  }

  generateMyPosts = () => {
    let accountId = this.props.account.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => {
        if (!post.deleted){
          return <Post key={post.id} post={post} selectBigPost={this.selectBigPost} selectOtherAccount={this.selectOtherAccount} />
        }
      }
    )
  }

  displayComments = () => {
    let accountId = this.props.account.id
    let list = this.props.comments.filter(obj => obj.account.id == accountId)

    return list.map(
      comment => {
        if (!comment.deleted){
          return <Comment key={comment.id} comment={comment} selectedComment={{}} source="account"/>
        }
      }
    )
  }

  selectBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push(`/bigpost/${post.id}`)
  }

  selectOtherAccount = (account) => {
    this.props.changeSelectedAccount(account)
    this.props.history.push(`/otheraccount/${account.id}`)
  }

  render() {
    if (!this.props.account) {
      return(
        <div>
        Loading
        </div>
      )
    } else {
      return(
        <div>
          <div>
          <p> Welcome {this.props.account.name}! </p>
          </div>
          <h1 className="accountSection">Posts</h1>
          <div>
          {this.generateMyPosts()}
          </div>
          <h1 className="accountSection">Comments</h1>
          <div>
          {this.displayComments()}
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
    comments: state.commentsChanger.comments,
    selectedPost: state.selectedPostChanger.selectedPost,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeComment: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Account);
