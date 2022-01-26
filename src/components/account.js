import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
import Comment from './comment.js'

class Account extends React.Component {

  state = {
    myAccount: false,
    pageAccount: {},
    displayTab: 'All'
  }

  componentDidMount() {

    let accountId = this.props.match.url.slice(9)

    fetch(`http://localhost:3000/api/v1/accounts/${accountId}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        pageAccount: json
      })
    })

    if (accountId == this.props.account.id) {
      this.setState({
        myAccount: true
      })
    }

  }

  generatePosts = () => {
    let accountId = this.state.pageAccount.id
    let list = this.props.posts.filter(obj => obj.account.id == accountId)

    return list.map(
      post => {
        if (!post.deleted){
          return <Post key={post.id} post={post} />
        }
      }
    )
  }

  displayComments = () => {
    let accountId = this.state.pageAccount.id
    let list = this.props.comments.filter(obj => obj.account.id == accountId)

    return list.map(
      comment => {
        if (!comment.deleted){
          return <Comment key={comment.id} comment={comment} selectedComment={{}} source="account"/>
        }
      }
    )
  }

  changeDisplayTab = (event) => {
    this.setState({
      displayTab: event.innerText
    }, () => {
      event.id = 'selectedTab'
    })
  }

  render() {
    if (Object.keys(this.state.pageAccount).length == 0) {
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
            {this.state.myAccount ? <p>Welcome {this.props.account.name}!</p> : <p>Name {this.state.pageAccount.name}</p>}
          </div>
          <div id="accountDisplayTabs">
            <p onClick={(event) => {this.changeDisplayTab(event.target)}}>All</p>
            <p onClick={(event) => {this.changeDisplayTab(event.target)}}>Posts</p>
            <p onClick={(event) => {this.changeDisplayTab(event.target)}}>Comments</p>
          </div>

          {this.state.displayTab == 'All' ?
            <div>
              <h1 className="accountSection">Posts</h1>
                <div>
                  {this.generatePosts()}
                </div>
              <h1 className="accountSection">Comments</h1>
                <div>
                  {this.displayComments()}
                </div>
            </div> : this.state.displayTab == 'Posts' ?
                  <div>
                    <h1 className="accountSection">Posts</h1>
                      <div>
                        {this.generatePosts()}
                      </div>
                  </div> :
                  <div>
                    <div>
                      <h1 className="accountSection">Comments</h1>
                        <div>
                          {this.displayComments()}
                        </div>
                    </div>
                  </div>
          }
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts,
    comments: state.commentsChanger.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeComment: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Account);
