import {connect} from 'react-redux'
import App from './App';

const mapStateToProps = state => {
   return {
      name: state.name
   }
}
const mapDispatchToProps = state => {
   return {
      changeName: () => dispatch({type: "CHANGE_NAME"})
   }
}
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(App);
