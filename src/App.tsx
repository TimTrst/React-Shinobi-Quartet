import './App.css';
import React from "react"
import update from "immutability-helper";

import Game from "./game/Game";
import DarkMode from "./game/DarkMode";
import Login from "./login/login";
import axios from 'axios';

interface State{
  darkMode: boolean;
  loggedIn: boolean;
  errorFromParent: string;
}

export default class App extends React.Component<{}, State> {
  state = {
    darkMode: false,
    loggedIn: false,
    errorFromParent: "",
  };

  toggleDarkMode = () => {
    this.setState(prevState => (
      {
        darkMode: !prevState.darkMode
      }
    ));
  };

handleLogin = async (username: string, password: string) => {
  const result = await axios.post('http://localhost:3001/login', {
    username,
    password,
  });
  let loggedIn = false;
  let error = "Anmeldung fehlgeschlagen";
  if(result.data){
    error = "";
    loggedIn = true;
  }
  this.setState(prevState => 
    update(prevState, {
      loggedIn: {$set: loggedIn },
      errorFromParent: { $set: error},
     })
  );
}

render(){
    return (
      <DarkMode.Provider value = {this.state.darkMode}>
        {
          this.state.loggedIn && (
            <>
              <button onClick={this.toggleDarkMode}>DarkMode {this.state.darkMode && "off"}</button>
              <Game title="Shinobi Quartet"/>
            </>
          )}
        {
          !this.state.loggedIn && <Login onLogin={this.handleLogin} errorFromParent={this.state.errorFromParent} />
        }
      </DarkMode.Provider>
    );
  }
}


