import Shinobi from "./Shinobi";

function selectRandomProperty(){
    const properties = Object.keys(Shinobi.properties);
    const index = Math.floor(Math.random() * properties.length)
    return properties[index] as keyof Shinobi;
}

export default selectRandomProperty;