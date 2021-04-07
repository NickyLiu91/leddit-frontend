import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'
const commentIDs = []

class Comment extends React.Component {

    state = {
      text: ''
    }

    handleText = (event) => {
      this.setState({
        text: event.target.value
      })
    }

    seeOtherAccount = (account) => {
      this.props.changeSelectedAccount(account)
      this.props.history.push("otheraccount")
    }

    // replyComment = (event) => {
    //
    //   let currentComments = this.props.comments
    //   let currentPost = this.props.selectedPost
    //
    //   fetch('http://localhost:3000/api/v1/comments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    //     },
    //     body: JSON.stringify({
    //         content: this.state.text,
    //         account_id: this.props.account.id,
    //         post_id: this.props.selectedPost.id,
    //         parent_id: this.props.comment.id
    //     })
    //   })
    //   .then(r => r.json())
    //   .then(json => {
    //     currentPost.comments.push(json)
    //     this.props.changeComments([...currentComments, json])
    //     this.setState({reply: json})
    //   })
    // }

  nestedComments = (comment, comments, source="comments") => {
    // let childComments = this.props.comments.filter(comment2 => comment2.parent.id == comment.id)
  let childComments = comments.filter(comment2 => {return comment2.parent && comment2.parent.id == comment.id})
    // if (comment.children) {
      return childComments.map(comment2 => {
        return <ConnectedComment key={comment2.id} comment={comment2} type="child" selectComment={this.props.selectComment} selectedComment={this.props.selectedComment} cancel={this.props.cancel} source={source}/>
      })
    // }
  }

  seeAccount = (account) => {
    if (account.id == this.props.account.id) {
      this.props.history.push("/account")
    } else {
      this.props.changeSelectedAccount(account)
      this.props.history.push("otheraccount")
    }
  }

  editComment = () => {
    console.log("edit comment!")
  }

  render() {
    if (Object.keys(this.props.account).length == 0) {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.props.comment.content}</p>
              <p>{this.props.comment.account.name}</p>
              <p onClick={() => {this.props.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>

              {this.nestedComments(this.props.comment, this.props.comments)}
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (this.props.source == "account") {
      return(
        <div className="post">
          <ul>
            <li>
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
              <p>{this.props.comment.content}</p>
              <p>Posted in: {this.props.comment.post.title}</p>
              </div>
            </li>
          </ul>
        </div>
      )
    } else {
      if (this.props.comment.id == this.props.selectedComment.id) {
        return(
          <div className="post">
            <ul>
              <li>
                  <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                  <p>{this.props.comment.content}</p>
                  <p onClick={() => {this.props.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>
                  <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
                  <br/>
                  <button onClick={(event) => {this.props.selectComment(this.props.comment)}}>Reply</button>
                  <button onClick={(event) => {this.props.cancel(event)}}>Cancel</button>
                  {this.nestedComments(this.props.comment, this.props.comments)}
                </div>
              </li>
            </ul>
          </div>
        )
      } else {
        return(
          <div className="post">
            <ul>
              <li>
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <p>{this.props.comment.content}</p>
                <p onClick={() => {this.props.seeAccount(this.selectedPost.account)}}>{this.props.comment.account.name}</p>

                <button onClick={() => {this.props.selectComment(this.props.comment)}}>Reply</button>
                {this.nestedComments(this.props.comment, this.props.comments)}
                </div>
              </li>
            </ul>
          </div>
        )
      }
    }
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
    changeComments: (event) => dispatch({type: 'CHANGE_COMMENTS', newComments: event}),
    changeSelectedAccount: (event) => dispatch({type: 'CHANGE_SELECTEDACCOUNT', selectedAccount: event})
  }
}

const ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Comment)

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Comment);
