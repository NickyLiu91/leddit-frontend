import React from "react";
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
// import { loginUser } from '../actions/user'

class LogIn extends React.Component {

  state = {
    name: '',
    password: ''
  }

  logIn = () => {
    fetch(`http://localhost:3000/api/v1/accounts`)
    .then(res => res.json())
    .then(json => {console.log(json)})
  }

  fetchy = () => {
    fetch("http://localhost:3000/api/v1/accounts")
    .then(res => res.json())
    .then(json => {console.log(json[0].password_digest)})
  }

  handleStuff= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.name, this.state.password)
    this.setState({
      name: '',
      password: ''
    })
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/profile" />
    } else {
      return(
        <div>
          <form
            onSubmit={this.handleLoginSubmit}
            loading={this.props.authenticatingUser}
            error={this.props.failedLogin}
          >
            Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
            <br/>
            <br/>
            Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
            <br/>
            <br/>
            <button type="submit">Login</button>
          </form>

        </div>
      )
    }
  }
}

export default LogIn
