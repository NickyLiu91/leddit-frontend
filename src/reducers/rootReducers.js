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

  function selectedPostChanger(state = {selectedPost: {}}, action) {
    switch (action.type) {
      case 'CHANGE_SELECTEDPOST':
        console.log(state);
        return {selectedPost: action.selectedPost}
      default:
        return state;
    }
  }

export default combineReducers({
  accountChanger,
  postsChanger,
  selectedPostChanger
})
