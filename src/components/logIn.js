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
    return(
      <div>
        <form>
          Account: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
        </form>
        <br />
        <button onClick={event => this.fetchy(event)}>CLICK ME</button>
        <button onClick={event => this.generateHashPassword(event)}>CLICK ME22</button>
      </div>
    )
  }
}

export default LogIn
