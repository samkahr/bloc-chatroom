import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./MessageList.css";

class MessageList extends Component {
  constructor (props) {
      super(props);
      this.state = {
        messageList: [],
        newMessage: [
                       { username: "" },
                       { content: "" },
                       { roomid: "" },
                       { sentat: "" },
                       { newMessage: "" },
        ]
      }

    this.messagesRef = firebase.database().ref( 'messages');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message ) })
  })

   //const ref = firebase.database().ref('messages').child(this.state.message.key)
   //this.messagesRef.on('child_removed', (child) => {
    //let remove = this.state.newMessage.filter((newMessage) => {
            //  return newMessage.key !== child.key
            //  });
             //this.setState({ remove })
   //})

}

handleChange(e) {
   this.setState({ newMessage: e.target.value });
}

handleSubmit(e) {
      e.preventDefault();
      this.messagesRef.push({
         username: this.props.user ? this.props.user.displayName: "Guest",
         content: this.state.newMessage,
         roomid: this.props.roomId,
         sentat: this.props.firebase.database.ServerValue.TIMESTAMP,
       });
       this.setState({newMessage: ''}) }

removeItem ( messageKey ) {
      const itemRef = firebase.database().ref(`messages/${messageKey}`);;
      itemRef.remove();
         }


  render() {
    return (
        <div className="messageWrapper">
        <ul className="filteredMessage">
          { this.state.messageList.filter((message) => message.roomid === this.props.roomId).map( (message, index)=>
          <div className="message" key={message.key}>
             <li className="user">{message.username}</li>
             <li className="messageContent">{message.content}</li>
             <input type="button" value= "delete"  onClick={ () => this.removeItem(message.key) } />
           </div>
         ) }
           </ul>


      <div className="form__row">
         <form onSubmit= { (e) => this.handleSubmit(e) } >
         <input
           className="form__input"
           type="text"
           placeholder="Type message"
           value={this.state.content}
           onChange={ (e) => this.handleChange(e) }
         />
          <input type='submit' value='send'/>
         </form>
       </div>
           </div>
    );
   }
}


export default MessageList;
