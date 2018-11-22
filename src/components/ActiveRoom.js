import React, { Component } from 'react';

class ActiveRoom extends Component {

render () {
return (

  <div className="Active Room">
  <h1> {this.props.roomId ? this.props.roomId : "Please select room to continue"}</h1>
  </div>
);
}
}

export default ActiveRoom;
