import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import LogIn from './logIn.js';

class LogInPage extends React.Component {

  render() {
    return (
      <div>
        <LogIn />
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
)(LogInPage);
