import {combineReducers} from 'redux'

  function accountChanger(state = {account: {}}, action) {
    switch (action.type) {
      case 'CHANGE_ACCOUNT':
        return {account: action.newAccount}
      default:
        return state;
    }
  }

  function postsChanger(state = {posts: []}, action) {
    switch (action.type) {
      case 'CHANGE_POSTS':
        // console.log(state);
        return {posts: action.newPosts}
      default:
        return state;
    }
  }

    function commentsChanger(state = {comments: []}, action) {
      switch (action.type) {
        case 'CHANGE_COMMENTS':
          // console.log(action.newComments);
          return {comments: action.newComments}
        default:
          return state;
      }
    }

  function selectedCommentChanger(state = {selectedComment: {}}, action) {
    switch (action.type) {
      case 'CHANGE_SELECTEDCOMMENT':
        // console.log(state);
        return {selectedComment: action.selectedComment}
      default:
        return state;
    }
  }

export default combineReducers({
  accountChanger,
  postsChanger,
  commentsChanger,
  selectedCommentChanger
})
