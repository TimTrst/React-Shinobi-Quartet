import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";

import './Game.css';
import Card from './Card';
import useCards from "./useCards";

interface Props{
    title: string;
}

export default function Game({ title } : Props) {   
    const [state, play] = useCards();
    return(
        <>
            <h1>{title}</h1>
            <div className ="info">
                {state.playersTurn ? 'Your turn' : 'Computers turn'}
            </div>
            <div className = "cards"> 
            {state.player[0] && (
                <Card 
                    shinobi={state.player[0]}                                             //Übergeben der Karte mit Values an die Card Klasse!
                    uncovered= {true}                                                    //Aufgedeckt?
                    selectedProperty={state.selectedProperty}                                  //Welche Zeile der Karte wurde gewählt?
                    onSelectProperty={play}     
                 //remove = {remove}
                 />
            )}
            {state.computer[0] &&(
                <Card 
                    shinobi={state.computer[0]} 
                    uncovered={state.computerUncovered}
                    selectedProperty={state.selectedProperty}
                //onSelectedProperty={this.getSlectedPropertyHandler.bind(this)()} 
                />
             )}
            </div>
        </>
    );
}
