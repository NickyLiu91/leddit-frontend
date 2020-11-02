import React from "react";

const Comment = (props) => {
  return(
    <div className="post">
      <ul>
        <li>
          <h1>{props.comment.content}</h1>
        </li>
      </ul>
    </div>
  )
}

export default Comment;
