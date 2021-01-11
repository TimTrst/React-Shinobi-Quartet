import styled, {css} from "styled-components";
import { Form as FormikForm, Field as FormikField } from "formik";

export const Form = styled(FormikForm)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    div {
        padding: 3px;
    }   
`;

export const Field = styled(FormikField)`
    &.error {
        border: 1px solid red;
    }
`;


export const Label = styled.label`
    width: 120px;
    display: inline-block;
`;
export const Row = styled.div`
        &:nth-child(2n) {
        background-color: #ccc;
    }       
`;

export const Error = styled.div`
  color: red;
`;
