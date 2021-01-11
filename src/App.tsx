import './App.css';
import React from "react"
import update from "immutability-helper";

import Game from "./game/Game";
import DarkMode from "./game/DarkMode";
import Login from "./login/login";
import axios from 'axios';
import From from "./admin/Form";
import Shinobi from './game/Shinobi';

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
      <From
        onSubmit={shinobi => {
        const data = new FormData();
        data.append('name', shinobi.name);
        data.append('image', shinobi.image);
        data.append('size', shinobi.size.toString());
        data.append('weight', shinobi.weight.toString());
        data.append('age', shinobi.age.toString());
        data.append('chakra', shinobi.chakra.toString());
        data.append('power', shinobi.power.toString());
        axios.post('http://localhost:3001/card', data, {
          headers: {
           'content-type': 'multipart/form-data',
           },
      });
    }}/>
        );
        {/*
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
      */ }
  }
}


