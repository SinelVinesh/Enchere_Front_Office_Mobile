import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import LoginInsc from "./LoginInsc";
import Menu from './Menu';
type Props = {
    isAuth:string,
}
class Stack extends React.Component<Props>
{
  render()
  {   
  return (
      <span>
        {(this.props.isAuth === 'true')&&<Menu/>}
        {(this.props.isAuth === 'false')&&<LoginInsc/>}
      </span>
  );
}
}
const mapStateToProps = (state:any)=>{
  return{
    isAuth:state.isAuth
  }
}
  
export default connect(mapStateToProps,null)(Stack);