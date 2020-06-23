import React from "react";

class LogIn extends React.Component {

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

  render() {
    return(
      <div>
        <form>
          <p>Account</p>
          <input type="text"/>
          <p>Password</p>
          <input type="text"/>
        </form>
        <br />
        <button onClick={event => this.fetchy(event)}>CLICK ME</button>
      </div>
    )
  }
}

export default LogIn
