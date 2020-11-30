import React from "react";

const Comment = (props) => {
  return(
    <div className="post">
      <ul>
        <li>
          <p>{props.comment.content}</p>
        </li>
      </ul>
    </div>
  )
}

export default Comment;
