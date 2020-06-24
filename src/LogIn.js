import React from "react";
const bcrypt = require('bcryptjs')
const saltRounds = 10

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

  handleStuff= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  generateHashPassword = () => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(this.state.password, salt)
    console.log(hash)
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
