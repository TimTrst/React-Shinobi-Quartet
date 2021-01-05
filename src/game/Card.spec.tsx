import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';
import Shinobi from './Shinobi';
import Animal from './Shinobi'; 

describe("Card", () => {
    describe("Snapshots", () => {
        it("should match the snapshots", () => {
            const shinobi = new Shinobi("Tendo", "Bild", 1.8, 67, 32, 500, 3700);

            const tree = renderer.create(<Card shinobi={shinobi} uncovered ={true} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});