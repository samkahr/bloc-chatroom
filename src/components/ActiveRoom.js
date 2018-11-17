import React, { Component } from 'react';

class ActiveRoom extends Component {

render () {
return (

  <div className="Active Room">
  <h1>{this.props.roomId}</h1>
  </div>
);
}
}

export default ActiveRoom;
