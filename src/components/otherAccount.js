import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class OtherAccount extends React.Component {

  generateOtherAccountPosts = () => {
    let accountId = this.props.selectedAccount.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => <Post post={post} seeBigPost={this.seeBigPost} seeOtherAccount={this.seeOtherAccount}/>
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  seeOtherAccount = (account) => {
    console.log(account)
    this.props.changeSelectedAccount(account)
    this.props.history.push("otheraccount")
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts,
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
