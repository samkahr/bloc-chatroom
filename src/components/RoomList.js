import React, { Component } from 'react';



class RoomList extends Component {

  constructor (props) {
    super (props);
    this.state = {
    rooms: [],
    newRoomName: '' };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

componentDidMount() {
          this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) })
       });
     }


handleChange(e) {
   this.setState({newRoomName: e.target.value})
}

handleSubmit(e) {

       const newRoomName = { name: this.state.newRoomName};
       this.roomsRef.push({ name: newRoomName});
       //this.setState({ rooms: [...this.state.rooms, newRoomName]});
}

  render () {
    return (
    <section className="chatroom">
      <ul>
      <h3>Room List</h3>
     {this.state.rooms.map( (room) =>
           <div key={room.key} >
             {room.name}
           </div>
         )
       }
       </ul>


       <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="New Room Name"
          onChange={ (e) => this.handleChange(e) }
         />
    <input type="submit" />
    </form>


    </section>
   );
  }
}


export default RoomList;
