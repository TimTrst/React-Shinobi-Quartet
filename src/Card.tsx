import React, {useContext} from 'react';
import PropTypes from "prop-types";

import "./Card.css"
import Shinobi from "./Shinobi";
import DarkMode from "./DarkMode";

interface Props {
    shinobi: Shinobi;
    uncovered: boolean;
    onSelectedProperty?: (property: keyof Shinobi) => void;
    selectedProperty?: keyof Shinobi | '';
}

export default function Card({shinobi, uncovered, onSelectedProperty, selectedProperty}: Props) {
    
    const front = (
    <>
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
                    const propertyValue = shinobi[property as keyof Shinobi];
                    return(
                        <tr key = {property} className={selectedProperty === property ? 'active' : ''}
                             onClick={() => onSelectedProperty && onSelectedProperty(property as keyof Shinobi)}>
                            <td>{shinobiProberty.label}</td>
                            <td>
                                {propertyValue}&nbsp;{shinobiProberty.unit}</td>
                        </tr>
                    );
                })}
             </tbody>
            </table>
    </>
);
        
        const back = (<div className = "back back" >
        <img alt="akatsuki" className ="akatsuki"  src={`${process.env.PUBLIC_URL}/bilder/akatsuki.png`}
            height="180" width="210" />
        </div>);
        
        const darkMode = useContext(DarkMode);
        
        const classNames = [
            'card',
            uncovered ? '' : 'back',
            darkMode ? 'dark' : 'light',
        ]
        
        return(<div className = {classNames.join(' ')}>{uncovered ? front : back}</div>);
}
