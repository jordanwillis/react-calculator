import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
  classNameFromType = {
    number: "number-btn",
    operator: "operator-btn",
    delete: "delete-btn",
    equals: "equals-btn",
  }

  render() {
    const {className} = this.props;
    
    return (
      <button 
        className={'btn-style ' + this.classNameFromType[this.props.type] + ' ' + className} 
        value={this.props.value}
        onClick={() => this.props.onClick(this.props.type, this.props.value)}>
          {this.props.value}
      </button>
    );
  }
}

export default Button;