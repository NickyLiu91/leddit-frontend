import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './post.js'

class Account extends React.Component {

  generateMyPosts = () => {
    let list = this.props.account.posts

    return list.map(
      post => <Post post={post} seeBigPost={this.seeBigPost}/>
    )
  }

  render() {
    console.log(this.props.account)
    return(
      <div>
        <div>
          Name: {this.props.account.name}
        </div>
        <br />
        <div>
          {this.generateMyPosts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Account);
