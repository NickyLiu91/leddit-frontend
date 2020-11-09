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

  logIn = () => {
    fetch(`http://localhost:3000/api/v1/accounts`)
    .then(res => res.json())
    .then(json => {console.log(json)})
  }

  handleStuff= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
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
      this.setState({
        account: json,
        token: json.jwt
      })
      this.props.changeAccount(json)
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
        <button type="submit">Login</button>
        <button onClick={event => {this.handleLoginSubmit}}>CLICK</button>
      </div>
    )
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
    changeToken: (event) => dispatch({type: 'CHANGE_TOKEN', newToken: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
  mapDispatchToProps)
)(LogIn);
