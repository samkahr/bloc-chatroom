import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCi_1xIPnZ-mrKYHW5f9dottD7c9Nx2I7U",
    authDomain: "bloc-chatroom-e2bce.firebaseapp.com",
    databaseURL: "https://bloc-chatroom-e2bce.firebaseio.com",
    projectId: "bloc-chatroom-e2bce",
    storageBucket: "bloc-chatroom-e2bce.appspot.com",
    messagingSenderId: "1020356211026"
  };

firebase.initializeApp(config);



class App extends Component {


  render() {
    return (

      <div className="wrapper">
        <header className="header">Bloc Chatz
        </header >
       <div className="roomlist">
       <RoomList firebase={ firebase }/>
       </div>
       <div className="main">
       <p>Messages go here</p>
        </div>

      </div>
    );
  }
}

export default App;
