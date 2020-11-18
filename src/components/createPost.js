import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class CreatePost extends React.Component {

  state = {
    title: '',
    content: ''
  }

  handleStuff= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  createPost = () => {
    let currentPosts = this.props.posts

    fetch(`http://localhost:3000/api/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(
        {
          title: this.state.title,
          content: this.state.content,
          account_id: this.props.account.id
        }
      )})
      .then(res => res.json())
      .then(json => {
        this.props.changePosts([...currentPosts, json])
      })
    }

  render() {
    return(
      <div>
        <div>
          Title: <input id="title" type="text" value={this.state.title} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
          Content: <textarea id="content" value={this.state.content} onChange={event => this.handleStuff(event)}/>
          <br/>
          <br/>
        </div>
        <button onClick={this.createPost}>Post</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    posts: state.postsChanger.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: (event) => dispatch({type: 'CHANGE_POSTS', newPosts: event}),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps,
  mapDispatchToProps)
)(CreatePost);
