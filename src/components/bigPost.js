import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class BigPost extends React.Component {

  render() {
    if (Object.keys(this.props.account).length == 0) {
      return (
        <div>
          <LogIn />
        </div>
      )
    } else {
      return (
        <div>
          <Account account={this.props.account}/>
        </div>
      )
    }
  }
}

export default BigPost;
