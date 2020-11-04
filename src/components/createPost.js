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

  createPost = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
          {
            title: this.state.title,
            content: this.state.content,
            account_id: this.props.account.id
          }
      )})
    }
  }

  render() {
    return(
      <div>
      <form>
        Title: <input id="title" type="text" value={this.state.title} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        Content: <textarea id="content" value={this.state.content} onChange={event => this.handleStuff(event)}/>
        <br/>
        <br/>
        <button type="submit">Post</button>
      </form>
      <button onClick={console.log(this.state)}>BUTTON<button/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
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
  connect(mapStateToProps)
)(CreatePost);
