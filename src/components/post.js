import React from "react";
import { useHistory } from "react-router"

const Post = (props) => {
  const history = useHistory();
  return(
    <div className="post">
      <ul>
        <li onClick={() => {props.seeBigPost(props.post)}}>
          <h1>{props.post.title}</h1>
          <p>{props.post.content}</p>
          <p> - {props.post.account.name}</p>
        </li>
      </ul>
    </div>
  )
}

export default Post;
