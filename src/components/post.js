import React from "react";

const Post = (props) => {
  return(
    <div className="post">
      <ul>
        <li>
          <h1>{props.post.title}</h1>
          <p>{props.post.content}</p>
        </li>
      </ul>
    </div>
  )
}

export default Post;
