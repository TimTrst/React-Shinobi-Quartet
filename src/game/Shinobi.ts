export default class Shinobi {
    static properties : { [key: string]: {label: string, unit: string}} = 
    {
        size: {label: 'Size', unit: 'm'},
        weight: {label: 'Weight', unit: 'kg'},
        age: {label: 'Age', unit: 'Years'},
        chakra: {label: 'Chakra', unit: 'Points'},
        power: {label: 'Power', unit: ''}
    };
    
    public id?: number;

    constructor(
        public name :string,
        public image : string,
        public size : number | '',
        public weight : number | '',
        public age : number | '',
        public chakra : number | '',
        public power : number | '',
    ){}
}