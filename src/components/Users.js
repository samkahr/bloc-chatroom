import React, { Component } from 'react';
import './Users.css'

class Users extends Component {


  constructor(props) {
    super(props);

    this.signIn=this.signIn.bind(this);
    this.signOut=this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    })
    }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render(){
   return(
       <div className="username">
         <h3>{this.props.user ? this.props.user.displayName : "Guest"}</h3>
         <button className="signin" onClick={this.signIn}> Sign In </button>
         <button className="signout" onClick={this.signOut}> Sign Out </button>
       </div>
   )
 }


}

export default Users;
