import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
import Comment from './comment.js'

class OtherAccount extends React.Component {

  componentDidMount() {
    console.log(this.props)
    let accountId = this.props.match.url.slice(14)

    fetch(`http://localhost:3000/api/v1/accounts/${accountId}`)
    .then(res => res.json())
    .then(json => {
      this.props.changeSelectedAccount(json)
    })
  }

  generateOtherAccountPosts = () => {
    let accountId = this.props.selectedAccount.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => <Post key={post.id} post={post} seeBigPost={this.seeBigPost} seeOtherAccount={this.seeOtherAccount} selectBigPost={this.selectBigPost}/>
    )
  }

  displayComments = () => {
    let accountId = this.props.selectedAccount.id
    let list = this.props.comments.filter(obj => obj.account.id == accountId)

    return list.map(
      comment => <Comment key={comment.id} comment={comment} selectedComment={{}} source="account"/>
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  seeOtherAccount = (account) => {
    this.props.changeSelectedAccount(account)
    this.props.history.push("otheraccount")
  }

  selectBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  render() {
    return(
      <div>
        <div>
          Name: {this.props.selectedAccount.name}
        </div>
        <br />
        <div>
          {this.generateOtherAccountPosts()}
        </div>
        <br />
        <h1>Comments</h1>
        <div>
          {this.displayComments()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts,
    comments: state.commentsChanger.comments,
    selectedPost: state.selectedPostChanger.selectedPost,
    selectedAccount: state.selectedAccountChanger.selectedAccount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(OtherAccount);
