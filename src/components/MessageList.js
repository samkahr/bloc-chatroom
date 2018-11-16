import React, { Component } from 'react';

class MessageList extends Component {

  render() {
    return (
        <div className="message">
          { this.props.messageList.map((message) =>
           <div key={message.key}>
            <div>{message.content}</div>
            </div>
          )}
      </div>
       );
   }
}

export default MessageList;
