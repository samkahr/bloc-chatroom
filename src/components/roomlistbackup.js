import React, { Component } from 'react';

class RoomList extends Component {


  render () {
    return (


    <div className="chatroom">
      <ul>
      <h3>Room List</h3>

     {this.props.rooms.map( (room) =>
             <li key={room.key} className="room">
             <a
             onClick={ () => this.props.joinRoom(room.name) }
             href="#"> {room.name} </a>
             </li>
        )
       }
       </ul>


     <form onSubmit={ () => this.props.handleSubmit() }>
        <input
          type="text"
          placeholder="Add New Room"
          value={this.props.newRoomName}
          onChange={ (e) => this.props.handleChange (e) }
         />
    <input type="submit" />
    </form>

    </div>
   );
  }
}


export default RoomList;
