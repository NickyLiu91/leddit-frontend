import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';

class LogIn extends React.Component {

  state = {
    name: '',
    password: '',
    status: 'login'
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
      localStorage.setItem('jwt', json.jwt)
      this.props.changeAccount(json.account)
    })
  }

  changeLogInAndCreate = () => {
    if (this.state.status == 'login') {
      this.setState({
        status: 'create'
      })
    } else {
      this.setState({
        status: 'login'
      })
    }
  }

  render() {

    if (this.state.status == 'login') {
      return (
        <div>
          Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          <button onClick={this.handleLoginSubmit}>CLICK</button>
          <button onClick={this.changeLogInAndCreate}>Create Account</button>
        </div>
      )
    } else {
      return (
        <div>
          Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          <button onClick={this.handleLoginSubmit}>CLICK</button>
          <button onClick={this.changeLogInAndCreate}>Log In</button>
        </div>
      )
    }
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
)(LogIn);
