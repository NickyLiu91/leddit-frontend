// import React from "react";
// import { connect } from 'react-redux'
// import {compose} from 'redux';
// import { Route, Link, withRouter } from 'react-router-dom'
//
// class Account extends React.Component {
//
//   render() {
//     if (Object.keys(this.props.account).length != 0) {
//       return (
//         <div>
//           Name: {this.props.account.account.name}
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           No Account Found
//         </div>
//       )
//     }
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     account: state.accountChanger.account,
//   }
// }
//
// export default compose(
//   withRouter,
//   connect(mapStateToProps)
// )(Account);

import React from "react";

const Account = (props) => {
  return(
    <div>
      Name: {props.account.account.name}
    </div>
  )
}

export default Account;
