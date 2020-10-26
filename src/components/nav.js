import React from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Route, Link, withRouter, NavLink} from 'react-router-dom';

class Nav extends React.Component {

  render() {
    return(
      <nav>
        <ul>
        <li onClick={() => {this.props.history.push("/")}}>Home</li>
        <li onClick={() => {this.props.history.push("/login")}}>LogIn</li>
        <li onClick={() => {this.props.history.push("/posts")}}>Posts</li>
        <li onClick={() => {this.props.history.push("/account")}}>Account</li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Nav)
