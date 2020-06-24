import React from "react";

class LogIn extends React.Component {

  state = {
    name: '',
    password: ''
  }

  logIN = () => {
    fetch(`http://localhost:3000/api/v1/accounts`)
    .then(res => res.json())
    .then(json => {console.log(json)})
  }

  fetchy = () => {
    fetch("http://localhost:3000/api/v1/accounts")
    .then(res => res.json())
    .then(json => {console.log(json)})
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return(
      <div>
        <form>
          Account: <input type="text" value={this.state.name} onChange={event => this.handleName(event)}/>
          <br/>
          <br/>
          Password: <input type="password" value={this.state.password} onChange={event => this.handlePassword(event)}/>
        </form>
        <br />
        <button onClick={event => this.fetchy(event)}>CLICK ME</button>
      </div>
    )
  }
}

export default LogIn
