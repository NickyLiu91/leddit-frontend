import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class Account extends React.Component {

  render() {
    console.log(this.props.account)
    if (Object.keys(this.props.account).length != 0) {
      return (
        <div>
          Name: {this.props.account.account.name}
        </div>
      )
    } else {
      return (
        <div>
          No Account Found
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
  connect(mapStateToProps)
)(Account);
