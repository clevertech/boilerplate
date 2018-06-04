import React, { Component } from 'react';

class Box extends Component {
  render() {
    return <div style={{ maxWidth: '50%', margin: '0 auto' }}>{this.props.children}</div>;
  }
}

export default Box;
