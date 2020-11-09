import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';

class LogIn extends React.Component {

  state = {
    name: '',
    password: '',
    account: {},
    token: {}
  }

  handleStuff= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLoginSubmit = () => {
    this.loginUser(this.state.name, this.state.password)
  }

  loginUser = (username, password) => {

    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer <token>'
      },
      body: JSON.stringify({
          name: username,
          password_digest: password
      })
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      console.log(json.account)
      console.log(json.jwt)
      this.setState({
        account: json
      })
      this.props.changeAccount(json.account)
      this.props.changeToken(json.jwt)
    })
  }

  render() {
    return (
      <div>
        Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        <button onClick={this.handleLoginSubmit}>CLICK</button>
      </div>
    )
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
    changeAccount: (event) => dispatch({type: 'CHANGE_ACCOUNT', newAccount: event}),
    changeToken: (event) => dispatch({type: 'CHANGE_TOKEN', token: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
  mapDispatchToProps)
)(LogIn);
