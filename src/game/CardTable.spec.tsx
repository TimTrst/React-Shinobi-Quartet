import React from 'react';
import renderer from 'react-test-renderer';
import CardTable from './CardTable';
import Shinobi from './Shinobi';
import { render, fireEvent } from '@testing-library/react';


describe("CardTable", () => {
    it("should highlight a certain row correctly", () => {
        const shinobi = new Shinobi("Tendo", "Bild", 1.8, 67, 32, 500, 3700);
        const component = renderer.create(<CardTable shinobi={shinobi} darkMode={false} selectedProperty="size"/>);
        const rootInstance = component.root;
        const activeRow = rootInstance.findByProps({active: true});
        expect(activeRow.props.className).toBe('size');
    });
    it("should handle a click correctly", () => {
        const clickHandler = jest.fn();

        const shinobi = new Shinobi("Elefant", "Bild", 3.3,400,33,3,40);
        const component = renderer.create(<CardTable shinobi={shinobi} darkMode={false} onSelectProperty={clickHandler} />);
        const rootInstance = component.root;
        const sizeRow = rootInstance.findByProps({ className: 'size'});
        sizeRow.props.onClick();
    
        expect(clickHandler).toHaveBeenCalledWith('size');
    });
    
    describe("interacting with react testing library", () => {
        it("should emulate a click event", () => {
            const clickHandler = jest.fn();
            const shinobi = new Shinobi("Tendo", "Bild", 1.8, 67, 32, 500, 3700);
            const { container } = render (<CardTable shinobi = {shinobi} darkMode = {false} onSelectProperty={clickHandler} />);
            fireEvent.click(container.querySelector('.size')!);
            expect(clickHandler).toHaveBeenCalledWith('size');
        });
    });
})
