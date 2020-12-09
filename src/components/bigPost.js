import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import Comment from './comment.js';

class BigPost extends React.Component {

  state = {
    comment: false,
    text: ''
  }

  displayComments = () => {
    let list = this.props.selectedPost.comments

    return list.map(
      comment => <Comment key={comment.id} comment={comment} />
    )
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  cancel = (event) => {
    this.setState({
      comment: !this.state.comment
    })
  }

  render() {
    if (!this.state.comment) {
      return (
        <div>
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <button onClick={() => {this.setState({comment: !this.state.comment})}}>Comment</button>
          </div>
          <br/>
          <div>
            {this.displayComments()}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <h1>{this.props.selectedPost.title}</h1>
            <p>{this.props.selectedPost.content}</p>
            <textarea value={this.state.text} onChange={event => this.handleText(event)}></textarea>
            <br/>
            <button >Comment</button>
            <button onClick={(event) => {this.cancel(event)}}>Cancel</button>
          </div>
          <br/>
          <div>
            {this.displayComments()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    selectedPost: state.selectedPostChanger.selectedPost
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps)
)(BigPost);
