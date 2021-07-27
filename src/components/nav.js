import React from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Route, Link, withRouter, NavLink} from 'react-router-dom';

class Nav extends React.Component {

  render() {
    if (!localStorage.getItem('jwt')) {
      return(
        <nav id="nav">
          <div id="nav1">
            <p onClick={() => {this.props.history.push("/")}}>Home</p>
          </div>
          <div id="nav2">
            <p onClick={() => {this.props.history.push("/login")}}>LogIn</p>
          </div>
        </nav>
      )
    } else {
      return(
        <nav id="nav">
          <div id="nav1">
            <p onClick={() => {this.props.history.push("/")}}>Home</p>
          </div>
          <div id="nav2">
            <p onClick={() => {this.props.history.push("/account")}}>Account</p>
            <p onClick={() => {this.props.history.push("/createPost")}}>Create</p>
          </div>
        </nav>
      )
    }
  }
}

export default withRouter(Nav)
