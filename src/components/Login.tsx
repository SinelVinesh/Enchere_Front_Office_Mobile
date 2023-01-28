import "../assets/dist/css/adminlte.min.css";
import { connectedAction } from "../redux/action/connectionAction";
import { connect, Provider } from "react-redux";
import React, { useState } from "react";
import { sqlite } from "../App";
// import "./Login.css";
import { log } from "console";
import { SQLiteDBConnection } from "react-sqlite-hook";

 
interface Props{
    isAuth:string
    connecter:Function
  }
class Login extends React.Component<Props>
{
   async d():Promise<string>{
    try{
      console.log("21");
      
      // let isConn = await sqlite.isConnection("recencement");
      console.log("221");
      let db: SQLiteDBConnection;
      // if(!isConn.result) {
  
        db = await sqlite.createConnection("recencement")
      // } else {
        // db = await sqlite.retrieveConnection("recencement");
      // }
      await db.open();
      console.log("ato?");
      
      const stmt = `CREATE TABLE IF NOT EXISTS Personnes(id INTEGER PRIMARY KEY NOT NULL,nom text,prenom text,age integer)`;
      await db.query(stmt);
      const d = `insert into personnes(nom,prenom,age) values('avotra','kely',10)`
      await db.query(d);
      const res = `SELECT * FROM personnes`;
      const qValues = await db.query(res);
          
      if (qValues && qValues.values && qValues.values.length>0) 
      {
        console.log(qValues.values[0]);
      }
      return Promise.resolve("success")
    }
    catch(e)
    {
      console.log(e);
      
      return Promise.reject("error")
    }
  }
  render(): React.ReactNode {
    this.d()
    return(
    <div className="container">
      <div className="row">
        
        <div className="col-sm-12 center mt">
          <h1>Vente<strong> Enchere</strong></h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2 "></div>
        <div className="col-sm-8">
          <div className="form-group form-inline">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Adresse email" className="form-control" />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="password">Mot de passe:</label>
            <input id="Password" type="text" placeholder="password" className="form-control" />
          </div>
          <div className="form-group form-inline">
            <button onClick={()=>this.props.connecter()} className=' btn btn-block btn-success mt-2'>Se connecter</button>
          </div>
          <div className="form-group ">
            <p id="text"></p>
          </div>
          <div className="form-group text-center">
          <span>ou</span>
          </div>
          <div className="form-group text-center">
          <a href="/insc" className="btn btn-block btn-primary">S'inscrire</a>
          </div>

          <div className="form-group">
             
          </div>
          <div className="form-group">
            <button></button>
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
  
    export default connect(mapStateToProps,MapDispatchToProps)(Login);