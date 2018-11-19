import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./MessageList.css";

class MessageList extends Component {
  constructor (props) {
      super(props);
      this.state = {
        messageList: [],
      }

    this.messagesRef = firebase.database().ref( 'messages');
  }

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message ) })
  });
}


  render() {
    return (
        <div className="messageWrapper">
        <ul className="filteredMessage">
          { this.state.messageList.filter((message) => message.roomid === this.props.roomId).map( (message, index)=>
          <div className="message" key={index}>
             <li className="user">{message.username}</li>
             <li className="messageContent">{message.content}</li>
           </div>
         ) }
           </ul>
           </div>
    );
   }
}

export default MessageList;
