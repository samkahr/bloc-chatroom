import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./MessageList.css";

class MessageList extends Component {
  constructor (props) {
      super(props);
      this.state = {
        messageList: [],
        username: '',
        content: '',
        sentat: '',
        newMessage: '',

      }

    this.messagesRef = firebase.database().ref( 'messages');
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message ) })
  })

   this.messagesRef.on('child_removed', (child) => {
   let remove = this.state.messageList.filter((newMessage) => {
            return newMessage.key !== child.key
            });
            this.setState({ remove })
     })
}

handleChange(e) {
   this.setState({ content: e.target.value });
}

handleSubmit(e) {
  if ( e.key === 'Enter' ) {
       this.messagesRef.push({
         username: this.props.user ? this.props.user.displayName: "Guest",
         content: this.state.content,
         roomid: this.props.roomId,
         sentat: this.props.firebase.database.ServerValue.TIMESTAMP,
       });
       e.preventDefault();
       this.setState({content: ''})
     }
  }

removeItem ( messageKey ) {
      this.messagesRef.child(messageKey).remove();
          let remove = this.state.messageList.filter((newMessage) => {
            return newMessage.key !== messageKey
            });
            this.state.messageList = remove
    }


  render() {
    return (
        <div className="messageWrapper">
        <ul className="filteredMessage">
          { this.state.messageList.filter((message) => message.roomid === this.props.roomId).map( (message, index)=>
          <div className="message" key={message.key}>
             <li className="user">{message.username}</li>
             <li className="messageContent">
             {message.content}
             <br></br>
             <input className="messageButton" type="button" value= "delete"  onClick={ () => this.removeItem(message.key) } />
             </li>

           </div>
         ) }
           </ul>


      <div className="form__row">
        <form onKeyPress= { (e) => this.handleSubmit(e)}>
         <textarea
           rows="4"
           cols="50"
           className="form__input"
           type="text"
           placeholder="Type message"
           value={this.state.content}
           onChange={ (e) => this.handleChange(e) }
         />
         </form>


       </div>
           </div>
    );
   }
}


export default MessageList;
