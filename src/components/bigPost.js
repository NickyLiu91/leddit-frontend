import React from "react";
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class BigPost extends React.Component {

  render() {

    return (
      <div>
        BigPost
      </div>
    )
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
