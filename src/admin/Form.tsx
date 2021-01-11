import React from "react";
import useCardAdmin from './useCardAdmin';
import { Label, Row, Form, Error, Field} from './Form.styles';
import Shinobi from "../game/Shinobi";
import { Formik, ErrorMessage } from "formik";
import validationSchema from "./validationSchema"; 

interface Props{
    onSubmit: (shinobi: Shinobi) => void;
    shinobi?: Shinobi;
}

export default function From({ onSubmit,shinobi = new Shinobi('', '', '', '', '', '', ''),}: Props) {
    //const [shinobi, changeProperty] = useCardAdmin(initialShinobi);
    return (
      <Formik
        initialValues={shinobi}
        validationSchema= {validationSchema}
        onSubmit={(e, actions) => {
          onSubmit(e!);
          actions.setSubmitting(false);
          onSubmit(shinobi);
        }}
      >
        {({isSubmitting, errors, setFieldValue}) =>(
          <Form>
            <Row>
              <Label htmlFor="name">Name:</Label>
              <Field
                type="text"
                id="name"
                name="name"
                className={errors.name && "error"}
              />
              <ErrorMessage name="name" component={Error}/>
            </Row>
            <Row>
              <Label htmlFor="image">Bild:</Label>
              <input type="file" id="image" onChange={event => {setFieldValue("image", event.currentTarget.files![0])}}/>      
              <ErrorMessage name ="image" component={Error} />
            </Row>
            {(Object.keys(Shinobi.properties) as (keyof Shinobi)[]).map(property => {
              return (
                <Row key={property}>
                  <Label htmlFor={property}>
                    {Shinobi.properties[property].label}:
                  </Label>
                  <Field
                    type="text"
                    id={property}
                    name={property}
                    className={errors[property] && "error"}
                  />
                  <ErrorMessage name={property} component={Error} />
                </Row>
              );
              }
            )}
            <div>
              <button type="submit" disabled={isSubmitting}>speichern</button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
  