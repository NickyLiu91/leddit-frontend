import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Nav from './components/nav.js';

class Posts extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    // .then(json => console.log(this.props.changePosts))
    .then(json => {this.props.changePosts(json)})
  }

  generatePosts = () => {
    let list = this.props.posts

    return list.map(
      post => post
    )
  }

  render(){
    return (
      <div>
        <Nav />
        <div id="posts-list">
        {this.generatePosts}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsChanger.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(Posts);
