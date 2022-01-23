import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class LogInPage extends React.Component {

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
    if (this.state.status == 'login') {
      this.loginUser(this.state.name, this.state.password)
    } else {
      this.createUser(this.state.name, this.state.password)
    }
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
      this.props.history.push(`/account/${this.props.account.id}`)
    })
  }

  createUser = (username, password) => {

    fetch('http://localhost:3000/api/v1/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          name: username,
          password: password
      })
    })
    .then(r => r.json())
    .then(json => {
      this.loginUser(username, password)
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
          <button onClick={this.handleLoginSubmit}>Log In</button>
          <br/>
          <button onClick={this.changeLogInAndCreate}>Create Account Instead</button>
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
          <button onClick={this.handleLoginSubmit}>Create Account</button>
          <br/>
          <button onClick={this.changeLogInAndCreate}>Log In Instead</button>
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
)(LogInPage);
