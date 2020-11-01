import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Account from './account.js';

// import { loginUser } from '../actions/user'

class LogIn extends React.Component {

  state = {
    name: '',
    password: '',
    account: {}
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
        account: json
      })
      this.props.changeAccount(json)
    })
    // .then(console.log)

  }

  render() {
    if (Object.keys(this.props.account).length == 0) {
      return (
        <div>
          <form onSubmit={this.handleLoginSubmit}>
            Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
            <br/>
            <br/>
            Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
            <br/>
            <br/>
            <button type="submit">Login</button>
          </form>
          <button onClick={event => {console.log(this.props.account)}}>CLICK</button>
        </div>
      )
    } else {
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
)(LogIn);
  // export default LogIn
