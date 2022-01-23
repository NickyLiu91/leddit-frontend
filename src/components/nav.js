import React from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Route, Link, withRouter, NavLink} from 'react-router-dom';

class Nav extends React.Component {

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.changeAccount({})
    this.props.history.push("/login")
  }

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
            <p onClick={() => {this.props.history.push(`/account/${this.props.account.id}`)}}>Account</p>
            <p onClick={() => {this.props.history.push("/createPost")}}>Create</p>
            <p onClick={this.logOut}>LogOut</p>
          </div>
        </nav>
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
)(Nav);
