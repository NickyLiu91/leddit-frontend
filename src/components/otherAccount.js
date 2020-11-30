import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Posts from './posts.js'

class OtherAccount extends React.Component {

  generateMyPosts = () => {
    let accountId = this.props.account.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => <Post post={post} seeBigPost={this.seeBigPost}/>
    )
  }

  seeBigPost = (post) => {
    this.props.changeSelectedPost(post)
    this.props.history.push("bigpost")
  }

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.changeAccount({})
    this.props.history.push("/login")
  }

  render() {
    console.log(this.props)
    return(
      <div>
        <div>
          Name: {this.props.account.name}
        </div>
        <br />
        <div>
          {this.generateMyPosts()}
        </div>
        <br />
        <button onClick={this.logOut}>Log Out</button>
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
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDAccount', selectedAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(OtherAccount);
