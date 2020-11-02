import React from "react";
import { useHistory } from "react-router"

const Post = (props) => {
  const history = useHistory();
  return(
    <div className="post">
      <ul>
        <li onClick={() => {history.push("bigpost")}}>
          <h1>{props.post.title}</h1>
          <p>{props.post.content}</p>
        </li>
      </ul>
    </div>
  )
}

export default Post;
