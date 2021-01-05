import './App.css';
import React from "react"

import Game from "./game/Game";
import DarkMode from "./game/DarkMode"

interface State{
  darkMode: boolean;
}

export default class App extends React.Component<{}, State> {
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


