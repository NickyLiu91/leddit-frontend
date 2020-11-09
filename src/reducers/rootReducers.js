import {combineReducers} from 'redux'

  // const defaultState = {
  //   account: {}
  // }

  function accountChanger(state = {account: {}}, action) {
    switch (action.type) {
      case 'CHANGE_ACCOUNT':
        // console.log(state);
        return {account: action.newAccount}
      default:
        return state;
    }
  }

  function postsChanger(state = {posts: {}}, action) {
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

  function tokenChanger(state = {token: {}}, action) {
    switch (action.type) {
      case 'CHANGE_TOKEN':
        console.log(state);
        return {token: action.token}
      default:
        return state;
    }
  }

export default combineReducers({
  accountChanger,
  postsChanger,
  selectedPostChanger,
  tokenChanger
})
