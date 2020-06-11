import React, { Component,  useState, useEffect, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';

class Hello extends Component {
  constructor(props) {
    super(props);
    const { name } = props;

    this.state = {name};
    this.changeText = this.changeText.bind(this);
  }

  changeText() {
  	this.setState({name:"Bonjour"});
  }

  render() {
  	const { name } = this.state;

    return (
      <div onClick={this.changeText}>
              <span>{name}</span>
      </div>
    );
  }
}

export default Hello;