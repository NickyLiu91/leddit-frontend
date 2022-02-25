import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'

const Post = (props) => {
    return(
      <div className="post">
        <ul>
          <li>
            <h1 className="postTitle" onClick={() => {props.history.push(`/bigpost/${props.post.id}`)}}>{props.post.title}</h1>
            <p onClick={() => {props.history.push(`/account/${props.post.account.id}`)}}> Submitted on {props.post.created_at.slice(0, -14)} by {props.post.account.name}</p>
            <div>
              <p>Like: {props.post.postvotes.filter(vote => vote.like).length}</p>
              <p>Dislike: {props.post.postvotes.filter(vote => !vote.like).length}</p>
            </div>
          </li>
        </ul>
      </div>
    )
}

export default withRouter(Post);
