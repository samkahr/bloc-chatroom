import React, { Component } from 'react';



class RoomList extends Component {
  constructor (props) {
    super (props);
    this.state = {
    rooms: [],
    newRoomName: '',
  };
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
   this.setState({ newRoomName: e.target.value })
}

handleSubmit() {

       const newRoomName = this.state.newRoomName;
       this.roomsRef.push({ name: newRoomName});
       this.setState({newRoomName: ''})
}

  render () {
    return (

    <div className="chatroom">
      <ul>
      <h3>Room List</h3>
     {this.state.rooms.map( (room, index) =>
           <div key={index} >
             <div>{room.name.toString()}</div>
           </div>
         )
       }
       </ul>


     <form onSubmit={ (e) => this.handleSubmit(e) }>
        <input
          type="text"
          placeholder="Add New Room"
          value={ this.state.newRoomName }
          onChange={ (e) => this.handleChange (e) }
         />
    <input type="submit" />
    </form>

    </div>
   );
  }
}


export default RoomList;
