import React, {useContext} from 'react';
import PropTypes from "prop-types";

import "./Card.css"
import Shinobi from "./Shinobi.js";
import DarkMode from "./DarkMode";

export default function Card({shinobi, uncovered, onSelectedProperty, selectedProperty, remove}) {
    
    const front = (<div className = "card">
        <h1>{shinobi.name ? shinobi.name : 'Shinobi not found: ERROR'}</h1>
            {shinobi.image && 
            (
                <img alt={shinobi.name} src={`${process.env.PUBLIC_URL}/bilder/${shinobi.image}`}
                height="200" width="200" />
            )}
            <table>
             <tbody>
                {Object.keys(Shinobi.properties).map(property => {
                    const shinobiProberty = Shinobi.properties[property];
                    return(
                        <tr key = {property} className={selectedProperty === property ? 'active' : ''}
                             onClick={() => onSelectedProperty(property)}>
                            <td>{shinobiProberty.label}</td>
                            <td>
                                {shinobi[property]}&nbsp;{shinobiProberty.unit}</td>
                        </tr>
                    );
                })}
             </tbody>
            </table>
        </div>
        );
        
        const back = (<div className = "card back" >
        <img alt="akatsuki" className ="akatsuki"  src={`${process.env.PUBLIC_URL}/bilder/akatsuki.png`}
            height="180" width="210" />
        </div>);
        
        const darkMode = useContext(DarkMode);
        
        return(<div className = {darkMode ? "dark" : "light"}>{uncovered ? front : back}</div>);
}

Card.propTypes = {
    uncovered: PropTypes.bool.isRequired,
    shinobi: PropTypes.instanceOf(Shinobi).isRequired,
    onSelectedProperty: PropTypes.func,
    selectedProperty: PropTypes.string,
};