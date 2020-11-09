import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';
import LogIn from './logIn.js';

class LogInPage extends React.Component {


  render() {
    if (Object.keys(this.props.account).length == 0 || Object.keys(this.props.account).length == 0) {
      return (
        <div>
          <LogIn />
        </div>
      )
    } else {
      console.log(this.props)
      return (
        <div>
          <Account account={this.props.account}/>
          <button onClick={() => {console.log(this.props)}}>CLICK2222</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    token: state.tokenChanger.token,
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
