import React, { Component } from 'react';

class Result extends Component {
  render() {
    return (
      <div id="result">{this.props.result}</div>
    );
  }
}

export default Result;