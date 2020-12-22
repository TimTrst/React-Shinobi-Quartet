import './App.css';
import React from "react"

import Game from "./Game";
import DealCards from './withCards';
import DarkMode from "./DarkMode"

interface State{
  darkMode: boolean;
}

export default class App extends React.Component{
  state = {
    darkMode: false,
  };

  toggleDarkMode = () => {
    this.setState(prevState => (
      {
        darkMode: !prevState.darkMode
      }
    ));
  };

render(){
    return (
      <DarkMode.Provider value = {this.state.darkMode}>
        <button onClick={this.toggleDarkMode}>DarkMode {this.state.darkMode && "off"}</button>
        <Game title="Shinobi Quartet"/>
      </DarkMode.Provider>
    );
  }
}


