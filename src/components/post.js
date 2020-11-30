import React from "react";
import { useHistory } from "react-router"

const Post = (props) => {
  const history = useHistory();
  console.log(props)
  return(
    <div className="post">
      <ul>
        <li>
          <h1 onClick={() => {props.seeBigPost(props.post)}}>{props.post.title}</h1>
          <p>{props.post.content}</p>
          <p onClick={() => {props.seeOtherAccount(props.post.account)}}> - {props.post.account.name}</p>
        </li>
      </ul>
    </div>
  )
}

export default Post;
