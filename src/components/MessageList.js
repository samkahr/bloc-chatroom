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
  });
}

handleChange(e) {
   this.setState({ newMessage: e.target.value });
}

handleSubmit(e) {
       this.messagesRef.push({
         username: this.props.user ? this.props.user.displayName: "Guest",
         content: this.state.newMessage,
         roomid: this.props.roomId,
         sentat: this.props.firebase.database.ServerValue.TIMESTAMP,
       });
       this.setState({newMessage: ''}) }

deleteMessage (message, index) {

  const remove = this.state.newMessage.filter((message, i) => {
      return i !== index
    });
   this.setState({ newMessage: remove });

}


  render() {
    return (
        <div className="messageWrapper">
        <ul className="filteredMessage">
          { this.state.messageList.filter((message) => message.roomid === this.props.roomId).map( (message, index)=>
          <div className="message" key={index}>
             <li className="user">{message.username}</li>
             <li className="messageContent">{message.content}</li>
             <input type="button" value= "delete" onClick={ () => this.deleteMessage (message, index) } />
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
