import {combineReducers} from 'redux'

  function accountChanger(state = {account: {}}, action) {
    switch (action.type) {
      case 'CHANGE_ACCOUNT':
        // console.log(state);
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
          // console.log(state);
          return {comments: action.newComments}
        default:
          return state;
      }
    }

  function selectedPostChanger(state = {selectedPost: {}}, action) {
    switch (action.type) {
      case 'CHANGE_SELECTEDPOST':
        console.log(state);
        return {selectedPost: action.selectedPost}
      default:
        return state;
    }
  }

  function selectedAccountChanger(state = {selectedAccount: {}}, action) {
    switch (action.type) {
      case 'CHANGE_SELECTEDACCOUNT':
        console.log(state);
        return {selectedAccount: action.selectedAccount}
      default:
        return state;
    }
  }

export default combineReducers({
  accountChanger,
  postsChanger,
  selectedPostChanger,
  selectedAccountChanger,
  commentsChanger
})
