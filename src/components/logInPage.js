import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';
import LogIn from './logIn.js';

class LogInPage extends React.Component {


  render() {
    if (Object.keys(this.props.account).length == 0) {
      return (
        <div>
          <LogIn />
        </div>
      )
    } else {
      console.log(this.props.account)
      return (
        <div>
          <Account account={this.props.account}/>
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

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
  mapDispatchToProps)
)(LogInPage);
