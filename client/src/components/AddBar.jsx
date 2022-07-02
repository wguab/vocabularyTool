import React, { Component } from 'react';
import { render } from "react-dom";

class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recieveWord: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      recieveWord: e.target.value
    })
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.addFunc(this.state.recieveWord);
    this.setState({
      receiveWord: ''
    })
  }

  render() {
    return (
      <form className = 'addWord'>
        <input placeholder = 'please add word!' type = 'text' onChange = {this.handleInput}></input>
        <button onClick = {this.handleAdd}>add word</button>
      </form>
      )
  }
}




export default AddBar;