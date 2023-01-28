import React from "react";
import { connectedAction } from "../redux/action/connectionAction";
import "../assets/dist/css/adminlte.min.css";
import "./accueil.css"
import {connect} from 'react-redux';
interface Props{
  isAuth:string
  connecter:Function
}
class Accueil extends React.Component<Props>
{
    render(): React.ReactNode {
        return(
            <div className="container">
      <div className="row">
        
        <div className="col-sm-12 center mt">
          <h1>INSERTION</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2 "></div>
        <div className="col-sm-8">
          <div className="form-group form-inline">
            <label htmlFor="nom">Nom:{this.props.isAuth}</label>
            <input type="email" id="nom" placeholder="Adresse email" className="form-control" />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="prenom">Prenom:</label>
            <input id="prenom" type="text"  placeholder="password" className="form-control" />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="age">Age:</label>
            <input id="age" type="text"  placeholder="password" className="form-control" />
          </div>
          <div className="form-group form-inline">
            <button  onClick={()=>this.props.connecter()} className=' btn btn-block btn-primary mt-2'><i className="fa fa-check mr-2"></i> Inserer</button>
          </div>
        </div>      
      </div>
    </div>    
        );
    }
}
const MapDispatchToProps = (dispach:Function)=>{
  return{
      connecter:()=>dispach(connectedAction())
  }
}
const mapStateToProps = (state:any)=>{
  return{
    isAuth:state.isAuth
  }}

  export default connect(mapStateToProps,MapDispatchToProps)(Accueil);