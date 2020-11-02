import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class BigPost extends React.Component {

  render() {
    if (Object.keys(this.props.selectedPost).length != 0) {
      console.log(this.props.selectedPost)
      return (
        <div>
        {this.props.selectedPost.content}
        </div>
      )
    } else {
      return(
        <div>
        TEST
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
