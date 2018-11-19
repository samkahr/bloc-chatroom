import React, { Component } from 'react';

class MessageList extends Component {

  render() {
    return (
        <div className="message">
        <ul className="filteredMessage">
          { this.props.filteredMessages.map( (message, index)=>
          <div key={index}>
             <li>{message.username}</li>
             <li>{message.content}</li>
             <li>{message.sentat}</li>
             <li>{message.roomid}</li>
           </div>
         ) }
           </ul>
           </div>
    );
   }
}

export default MessageList;
