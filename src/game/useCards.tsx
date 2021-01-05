import { useState, useEffect } from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import Shinobi from "./Shinobi";
import selectRandomProperty from './selectRandomProperty';

interface Card {
    name: string;
    image: string;
    size: number;
    weight: number;
    age: number;
    chakra: number;
    power: number;
}

interface State{
    computerUncovered: boolean;
    selectedProperty?: keyof Shinobi | '';
    playersTurn: boolean;
    player: Shinobi [];
    computer: Shinobi [];
}

export default function useCards():[State, (property: keyof Shinobi) => void] {
    const [state, setState] = useState<State>({
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
                compare(state.selectedProperty as keyof Shinobi);
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

    function compare(property: keyof Shinobi){
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
        );
    }

    function play(property: keyof Shinobi) {
        setState(state => 
            update(state, {
            selectedProperty:  {$set: property},
            computerUncovered: { $set: true},
            })
        );
    }

    function dealCards(cards: Shinobi []){
        const computer : Shinobi[] = [];
        const player: Shinobi[] = [];
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