import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class Post extends React.Component {

  render() {
    if (this.props.post.account.id == this.props.account.id) {
      return(
        <div className="post">
          <ul>
            <li>
              <h1 onClick={() => {this.props.seeBigPost(this.props.post)}}>{this.props.post.title}</h1>
              <p>{this.props.post.content}</p>
            </li>
          </ul>
        </div>
      )
    } else {
      return(
        <div className="post">
          <ul>
            <li>
              <h1 onClick={() => {this.props.seeBigPost(this.props.post)}}>{this.props.post.title}</h1>
              <p>{this.props.post.content}</p>
              <p onClick={() => {this.props.seeOtherAccount(this.props.post.account)}}> - {this.props.post.account.name}</p>
            </li>
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
  }
}


export default compose(
  withRouter,
  connect(
    mapStateToProps)
)(Post);
