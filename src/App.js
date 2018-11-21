import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList.js';
import Users from './components/Users.js';
import ActiveRoom from './components/ActiveRoom.js';
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

constructor (props) {
    super(props);
    this.state = {
    rooms: [],
    newRoomName: '',
    roomId: '',
    user: '',

    }


this.joinRoom = this.joinRoom.bind(this);
this.setUser = this.setUser.bind(this);

  }


        joinRoom (room) {
            this.setState ({ roomId: room});
          }

        setUser (user) {
          user ? this.setState({ user: user }) : this.setState({ user: null });
           }


  render() {
    return (

      <div className="wrapper">


        <header className="header"> Bloc Chatz
        </header >

       <div className="roomlist">
       <RoomList rooms={this.state.rooms} handleChange={this.handleChange} handleSubmit={this.handleSubmit} newRoomName={this.state.newRoomName} joinRoom={this.joinRoom}  firebase={firebase}/>
       <Users user={this.state.user} setUser={this.setUser} firebase={firebase} />
       </div>

       <div className="main">
       <ActiveRoom roomId={this.state.roomId}  />
       <MessageList roomId={this.state.roomId} user={this.state.user} setUser={this.setUser} roomId={this.state.roomId} firebase={firebase} />
        </div>


      </div>
    );
  }
}

export default App;
