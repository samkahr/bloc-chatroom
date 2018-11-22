import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor (props) {
      super(props);
      this.state = {
      rooms: [],
      newRoomName: '',

      }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = firebase.database().ref('rooms');


  }

  componentDidMount() {
            this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
          });

          this.roomsRef.on('child_removed', (child) => {
          let remove = this.state.rooms.filter((room) => {
                   return room.key !== child.key
                   });
                   this.setState({ remove })
                 })
            }

    handleChange(e) {
         this.setState({ newRoomName: e.target.value });
      }

    handleSubmit(e) {
             this.roomsRef.push({ name: this.state.newRoomName});
             this.setState({newRoomName: ''})
      }

    removeItem ( roomKey ) {
            this.roomsRef.child(roomKey).remove();
            let remove = this.state.rooms.filter((room) => {
                     return room.key !== roomKey
                     });
                     this.state.rooms = remove
               }
  render () {
    return (


    <div className="chatroom">
      <ul>
      <h3>Room List</h3>

     {this.state.rooms.map( (room) =>
             <li key={room.key} className="room">
             <a
             onClick={ () => this.props.joinRoom(room.name) }
             href="#"> {room.name} </a>
             <input className="button" type="button" value= "delete"  onClick={ () => this.removeItem(room.key) } />
             </li>
        )
       }
       </ul>


     <form onSubmit={ () => this.handleSubmit() }>
        <input
          type="text"
          placeholder="Add New Room"
          value={this.state.newRoomName}
          onChange={ (e) => this.handleChange (e) }
         />
    <input className="button" type="submit" />
    </form>

    </div>
   );
  }
}


export default RoomList;
