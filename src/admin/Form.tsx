import React from "react";
import useCardAdmin from './useCardAdmin';
import { Form, Error, Field, TextField } from './Form.styles';
import Shinobi from "../game/Shinobi";
import { Formik, ErrorMessage, FieldProps } from "formik";
import validationSchema from "./validationSchema"; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@material-ui/core';

interface Props{
    onSubmit: (shinobi: Shinobi) => void;
    shinobi?: Shinobi;
    open: boolean;
    onClose: () => void;
}

export default function From({ 
  onSubmit,
  shinobi = new Shinobi('', '', '', '', '', '', ''),
  open,
  onClose,
  }: Props) {
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" aria-describedby="form-dialog-description">
        <Formik
          initialValues={shinobi}
          validationSchema= {validationSchema}
          onSubmit={(e, actions) => {
            onSubmit(e!);
            actions.setSubmitting(false);
            onSubmit(shinobi);
          }}
        >
          {({isSubmitting, errors, setFieldValue, touched}) =>(
            <Form>
              <DialogTitle id="form-dialog-title">
                {shinobi.id ? "Edit Card" : "make new card"}
              </DialogTitle>
              <DialogContent id="confirm-dialog-description">
              <div>
                <Field
                  id="name"
                  name="name"
                  render={({ field }: FieldProps) => (
                    <TextField 
                      {...field}
                      error={!!(errors.name && touched.name )}
                      label="Name" 
                    />
                  )}
                  />
                <ErrorMessage name="name" component={Error}/>
              </div>
              <div>
                <Field
                  id="image"
                  name="image"
                  render={() => (
                    <Button variant="contained" component="label">
                      Bild
                      <input
                        type="file"
                        style={{display: "none"}}
                        onChange={event => {setFieldValue("image", event.currentTarget.files![0])}}
                      />
                    </Button>
                    )}
                  />
                
                <ErrorMessage name ="image" component={Error} />
              </div>
              {(Object.keys(Shinobi.properties) as (keyof Shinobi)[]).map(property => {
                return (
                  <div key={property}>
                      {Shinobi.properties[property].label}:
                    <Field
                      id={property}
                      name={property}
                      render={({ field }: FieldProps) => (
                        <TextField
                        error={!!(errors[property] && touched[property])}
                        {...field}
                        label={Shinobi.properties[property].label}
                        />
                        )}
                      />
                    <ErrorMessage name={property} component={Error} />
                  </div>
                );
              }
              )}
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Speichern
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
  