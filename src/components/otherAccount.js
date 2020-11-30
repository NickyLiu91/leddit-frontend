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
      post => <Post post={post} seeBigPost={this.seeBigPost}/>
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  render() {
    console.log(this.props)
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
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event})
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(OtherAccount);
