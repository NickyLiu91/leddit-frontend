import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'

const Post = (props) => {

    return(
      <div className="post">
        <ul>
          <li>
            <h1 onClick={() => {props.history.push(`/bigpost/${props.post.id}`)}}>{props.post.title}</h1>
            <p onClick={() => {props.history.push(`/account/${props.post.account.id}`)}}> Submitted on {props.post.created_at.slice(0, -14)} by {props.post.account.name}</p>
          </li>
        </ul>
      </div>
    )
}

export default withRouter(Post);
