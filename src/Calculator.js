import React, { Component } from 'react';
import Button from './Button';
import Result from './Result';

import './Calculator.css';

const keyOperatorMapping = (value) => {
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(value)) {
    return "number";
  } else if (['+', '-', '/', '%', 'x'].includes(value)) {
    return 'operator';
  } else if (['=', 'Enter'].includes(value)) {
    return 'equals';
  } else  {
    return null;
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '',
      buffer: '',
      operator: null,
      newCalculation: true,
    };
  }

  performCalculation = {
    '+': (op1, op2) => {
      return op1 + op2;
    },
    '-': (op1, op2) => {
      return op1 - op2;
    },
    'x': (op1, op2) => {
      return op1 * op2;
    },
    '/': (op1, op2) => {
      return op1 / op2;
    },
    '%': (op1, op2) => {
      return op1 % op2;
    },
  }

  handleClick = (buttonType, value) => {
    const {buffer, displayValue, operator, newCalculation} = this.state;

    if (buttonType === 'number') {
      this.setState({
        displayValue: newCalculation ? value : displayValue + value,
        newCalculation: false,
      });
    } else if (buttonType === 'operator') {
      this.setState({
        buffer: displayValue.length ? displayValue : 0,
        operator: value,
        newCalculation: true,
      });
    } else if (buttonType === 'delete') {
      this.setState({
        displayValue: '',
        buffer: '',
        operator: null,
        newCalculation: true,
      });
    } else if (buttonType === 'equals') {
      this.setState({
        displayValue: this.performCalculation[operator](Number(buffer), Number(displayValue)) + '',
        newCalculation: true,
      });
    }
  }

  handleKeyPress = (event) => {
    const operator = keyOperatorMapping(event.key);
    if (operator != null) {
      this.handleClick(operator, event.key);
    }
  }

  componentWillMount() {
    this.keyPressHandle = document.addEventListener('keypress', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    return (
      <div id="background">
        <Result result={this.state.displayValue} />
        <div id="main">
          <div id="first-rows">
            <Button type="delete" value="Del" className="btn-style-wide" onClick={this.handleClick}/>
            <Button type="operator" value="%" onClick={this.handleClick}/>
            <Button type="operator" value="+" onClick={this.handleClick}/>
          </div>
          <div className="rows">
            <Button type="number" value="7" className="first-child" onClick={this.handleClick}/>
            <Button type="number" value="8" onClick={this.handleClick}/>
            <Button type="number" value="9" onClick={this.handleClick}/>
            <Button type="operator" value="-" onClick={this.handleClick}/>
          </div>
          <div className="rows">
            <Button type="number" value="4" className="first-child" onClick={this.handleClick}/>
            <Button type="number" value="5" onClick={this.handleClick}/>
            <Button type="number" value="6" onClick={this.handleClick}/>
            <Button type="operator" value="x" onClick={this.handleClick}/>
          </div>
          <div className="rows">
            <Button type="number" value="1" className="first-child" onClick={this.handleClick}/>
            <Button type="number" value="2" onClick={this.handleClick}/>
            <Button type="number" value="3" onClick={this.handleClick}/>
            <Button type="operator" value="/" onClick={this.handleClick}/>
          </div>
          <div className="rows">
            <Button type="number" value="0" className="first-child btn-style-wide" onClick={this.handleClick}/>
            <Button type="number" value="." onClick={this.handleClick}/>
            <Button type="equals" value="=" onClick={this.handleClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;