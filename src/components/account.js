import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
import Comment from './comment.js'

class Account extends React.Component {

  state = {
    myAccount: false
  }

  componentDidMount() {

    let accountId = this.props.match.url.slice(9)

    fetch(`http://localhost:3000/api/v1/accounts/${accountId}`)
    .then(res => res.json())
    .then(json => {
      this.props.changeSelectedAccount(json)
    })

    // if (accountId == this.props.account.id) {
    //   this.setState({
    //     myAccount: true
    //   })
    // }

  }

  generatePosts = () => {
    let accountId = this.props.account.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => {
        if (!post.deleted){
          return <Post key={post.id} post={post} selectBigPost={this.selectBigPost} selectAccount={this.selectAccount} />
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

  selectAccount = (account) => {
    // this.props.changeSelectedAccount(account)
    this.props.history.push(`/account/${account.id}`)
  }

  render() {
    if (Object.keys(this.props.selectedAccount).length == 0) {
      {/*if retrieving account*/}
      return(
        <div>
        Loading
        </div>
      )
    } else {
      return(
        <div>
          <div>
            {this.state.myAccount ? <p>Welcome {this.props.account.name}!</p> : <p>Name {this.props.selectedAccount.name}</p>}
          </div>
          <h1 className="accountSection">Posts</h1>
          <div>
          {this.generatePosts()}
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
    selectedAccount: state.selectedAccountChanger.selectedAccount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeComment: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedPost: (event) => dispatch({type: 'CHANGE_SELECTEDPOST', selectedPost: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Account);
