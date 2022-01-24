import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'

const Post = (props) => {

    return(
      <div className="post">
        <ul>
          <li>
            <h1 onClick={() => {props.history.push(`/bigpost/${props.post.id}`)}}>{props.post.title}</h1>
            <p>{props.post.content}</p>
            <p onClick={() => {props.history.push(`/account/${props.post.account.id}`)}}> - {props.post.account.name}</p>
            <p>Created at: {props.post.created_at.slice(0, -14)}</p>
          </li>
        </ul>
      </div>
    )
}

export default withRouter(Post);
