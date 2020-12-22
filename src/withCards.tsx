import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import Shinobi from "./Shinobi";

export default class DealCards extends React.Component{
        state = {
            computer: [],
            player: [],
        };

        async componentDidMount(){
            const {data} = await axios.get("http://localhost:3001/card");
            this.dealCards(data);         
        }

        dealCards(cards){
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
            this.setState(state => 
                update(state, {
                    player: { $set: player },
                    computer: { $set: computer},
                }),
            );
        }

        render(){
            const { computer, player } = this.state;
            return this.props.children(computer,player)
        }
}
