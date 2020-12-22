import { useState, useEffect } from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import Shinobi from "./Shinobi";
import selectRandomProperty from './selectRandomProperty';

export default function useCards(){
    const [state, setState] = useState({
        computerUncovered: false,
        selectedProperty: '',
        playersTurn: true,
        player: [],
        computer: [],
    });

    useEffect(() => {
        const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/card');
        dealCards(data);
     };
        fetchData();
        }, []);
        useEffect(() => {
        if (state.selectedProperty !== '') {
        setTimeout(() => {
        compare(state.selectedProperty);
        }, 2000);
     }
    }, [state.selectedProperty]);
        useEffect(() => {
        if (
            state.computerUncovered === false &&
            state.selectedProperty === '' &&
            state.playersTurn === false
        ) {
        setTimeout(() => {
        const property = selectRandomProperty();
        play(property);
        }, 2000);
        }
  }, [state.computerUncovered, state.selectedProperty, state.playersTurn]);

    function compare(property){
        let playersTurn = state.playersTurn;

        const cardPlayer = state.player[0];
        let player = update(state.player, { $splice: [[0,1]] });
        const cardComputer = state.computer[0];
        let computer = update(state.computer, { $splice: [[0,1]] });
    
        if(cardPlayer[property] > cardComputer[property])
        {
            playersTurn = true;
            player = update(player, { $push: [cardPlayer, cardComputer]} );
            //update(this.state.remove, true);
            if(computer.length === 0)
            {
                alert("Player wins!"); 
                return;
            }
        }
        else if(cardPlayer[property] < cardComputer[property])
        {
            playersTurn = false;
            computer = update(computer, { $push: [cardComputer, cardPlayer] });
            if(player.length === 0)
            {
                alert("Computer wins!");
                return;
            }
        }
        else{
            player = update(player,  { $push: [cardPlayer]} );
            computer = update(computer, { $push: [cardComputer]} );
        }
    
        setState(
            state => update(state, {
                $set: {
                    computerUncovered: false,
                    selectedProperty: "",
                    playersTurn,
                    player,
                    computer,
                },
            }),
            () => {
                if(!playersTurn){
                    setTimeout(() => {
                        const property = this.selectRandomProperty();
                        play(property);
                    }, 2500);
                }
            },
        );
    }

    function play(property) {
        setState(state => 
            update(state, {
            selectedProperty:  {$set: property},
            computerUncovered: { $set: true},
            }),
            () => {
                setTimeout(() => {
                    compare(property);
                }, 2500);
            },
        );
    }

    function dealCards(cards){
        const computer = [];
        const player = [];
        cards.forEach((card, index) => {
            const shinobi = new Shinobi(card.name, card.image, card.size, card.weight, card.age, card.chakra, card.power);
            if(index % 2 === 0)
            {
                computer.push(shinobi);
            }else{
                player.push(shinobi);
            }
        });
        setState(prevState => 
            update(prevState, {
                player: { $set: player },
                computer: { $set: computer},
            })
        );
    }
    return [state, play];
}