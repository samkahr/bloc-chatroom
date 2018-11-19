import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList.js';
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
    filteredMessages: [],
    newRoomName: '',
    roomId: '',

    }

this.roomsRef = firebase.database().ref('rooms');
this.messagesRef = firebase.database().ref( 'messages');
this.joinRoom = this.joinRoom.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
            this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
          });

        };

        handleChange(e) {
           this.setState({ newRoomName: e.target.value });
        }

        handleSubmit() {
               const newRoomName = this.state.newRoomName;
               this.roomsRef.push({ name: newRoomName});
        }

        joinRoom (room) {
            this.setState ({ roomId: room});
            //this.setState({ filteredMessages: this.state.messageList.filter((message) => message.roomid === this.state.roomId) })
          }


  render() {
    return (

      <div className="wrapper">


        <header className="header">Bloc Chatz
        </header >


       <div className="roomlist">
       <RoomList rooms={this.state.rooms} handleChange={this.handleChange} handleSubmit={this.handleSubmit} newRoomName={this.state.newRoomName} joinRoom={this.joinRoom}  firebase={firebase}/>
       </div>

       <div className="main">
       <ActiveRoom roomId={this.state.roomId}  />
       <MessageList roomId={this.state.roomId} firebase={firebase} />
        </div>


      </div>
    );
  }
}

export default App;