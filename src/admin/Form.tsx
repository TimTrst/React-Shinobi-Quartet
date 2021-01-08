import React from "react";
import useCardAdmin from './useCardAdmin';
import { Label, Row, Form} from './Form.styles';
import Shinobi from "../game/Shinobi";
import { Formik, ErrorMessage } from "formik";
import validationSchema from "./validationSchema"; 

interface Props{
    onSubmit: (shinobi: Shinobi) => void;
    shinobi?: Shinobi;
}

export default function From({ onSubmit, shinobi: initialShinobi }: Props) {
    const [shinobi, changeProperty] = useCardAdmin(initialShinobi);
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(shinobi);
        }}
      >
        <Row>
          <Label htmlFor="name">Name:</Label>
          <input
            type="text"
            id="name"
            value={shinobi.name}
            onChange={changeProperty}
          />
        </Row>
        <Row>
          <Label htmlFor="image">Bild:</Label>
          <input type="file" id="image" onChange={changeProperty}/>      
        </Row>
        {Object.keys(Shinobi.properties).map(property => {
          let value = (shinobi as any)[property];
          value = value === 0 ? '' : value;
          return (
            <Row key={property}>
              <Label htmlFor={property}>
                {Shinobi.properties[property].label}:
              </Label>
              <input
                type="text"
                id={property}
                value={value}
                onChange={changeProperty}
              />
            </Row>
          );
        })}
        <div>
          <button type="submit">speichern</button>
        </div>
      </Form>
    );
  }
  