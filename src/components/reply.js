import React from "react";

const Reply = (props) => {
  return(
    <div className="post">
      <ul>
        <li>
            <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
            <p>{props.editText}</p>
            <p onClick={() => {props.selectAccount(props.comment.account)}}>{props.comment.account.name}</p>
            <textarea value={props.replyText} onChange={event => props.handleReplyText(event)}></textarea>
            <br/>
            <button onClick={(event) => {props.submitCommentReply(event)}}>Reply</button>
            <button onClick={(event) => {props.cancel(event)}}>Cancel</button>
            {props.nestedComments(props.comment, props.comments)}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Reply
