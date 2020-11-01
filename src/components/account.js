import React from "react";

const Account = (props) => {
  console.log(props)
  return(
    <div>
      Name: {props.account.account.name}
    </div>
  )
}

export default Account;
