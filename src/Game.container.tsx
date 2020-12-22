import * as React from 'react';
import * as PropTypes from "prop-types";
import update from 'immutability-helper';

import Shinobi from './Shinobi';
import GameComponent from "./Game";

export default class Game extends React.Component{
    constructor(props){
        super(props)
        this.play = this.play.bind(this);
    }

    static defaultProps = {
        title: "Shinobi Quartett",
    };
    static propTypes = {
        title: PropTypes.string,
    };

    state = {
        computerUncovered: false,
        selectedProperty: '',
        playersTurn: true,
        player: [],
        computer: [],
    };
    
    componentDidUpdate(prevProps){
        if(
            prevProps.player.length === 0 && this.props.player.length > 0 &&
            prevProps.computer.length === 0 && this.props.computer.length > 0
        ){
            this.setState(state => 
                update(state,
                    { 
                        player: { $set: this.props.player},
                        computer: { $set: this.props.computer},
                    }
                )
            );
        }
    }

    

    render() {
    return (
        <GameComponent
            {...this.state}
            title={this.props.title}
            play={this.play}
        />
      );
    }
}