import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';
import LogIn from './logIn.js';

class LogInPage extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.fetchCurrentUser()
    }
  }

  fetchCurrentUser = () => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
    .then(json => {this.props.changeAccount(json)})
  }

  render() {
    if (localStorage.getItem('jwt')) {
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
