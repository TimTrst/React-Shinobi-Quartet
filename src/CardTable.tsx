import React, {useContext} from 'react';
import Radium from "radium";

import styles from "./CardTable.styles";
import Shinobi from "./Shinobi";
import DarkMode from "./DarkMode";

interface Props {
    shinobi: Shinobi;
    onSelectedProperty?: (property: keyof Shinobi) => void;
    selectedProperty?: keyof Shinobi | '';
    darkMode: boolean;
}

function CardTable({shinobi, onSelectedProperty, selectedProperty, darkMode}: Props) {
    
    const front = (
    <div className ="card">
        <h1>{shinobi.name ? shinobi.name : 'Shinobi not found: ERROR'}</h1>
            {shinobi.image && 
            (
                <img alt={shinobi.name} src={`${process.env.PUBLIC_URL}/bilder/${shinobi.image}`}
                height="200" width="200" />
            )}
            <table style = {styles.table}>
             <tbody>
                {Object.keys(Shinobi.properties).map(property => {
                    const shinobiProberty = Shinobi.properties[property];
                    const propertyValue = shinobi[property as keyof Shinobi];
                    return(
                        <tr 
                        style={
                            ([
                            styles.tr,
                            index % 2 === 0 ? styles[mode].tr : '',
                            selectedProperty === property ? styles.activeRow : '',
                            ] as unknown) as React.CSSProperties
                            }
                            key = {property}
                             onClick={() => onSelectedProperty && onSelectedProperty(property as keyof Shinobi)}
                             >
                            <td style={styles.td}>{shinobiProberty.label}</td>
                            <td style={styles.td}>
                                {propertyValue}&nbsp;{shinobiProberty.unit}</td>
                        </tr>
                    );
                })}
             </tbody>
            </table>
    </div>
);
        
        const back = (<div className = "back" >
        <img alt="akatsuki" className ="akatsuki"  src={`${process.env.PUBLIC_URL}/bilder/akatsuki.png`}
            height="180" width="210" />
        </div>);
        
        const darkMode = useContext(DarkMode);
               
        return(<div className = {darkMode ? "dark" : "light"}>{uncovered ? front : back}</div>);
}

export default Radium(CardTable);