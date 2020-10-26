import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class Account extends React.Component {

  render() {
    return (
      <div>
        Account Info
      </div>
    )
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
