import * as Yup from "yup";

Yup.setLocale({
    mixed: {
        required: "Pflichtfeld, bitte einen Wert eingeben",
        notType: "Bitte nur eine Zahl eingeben",
    },
    number: {
        moreThan: "Bitte nur Zahlen größer als 0 eingeben",
    },
});

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    image: Yup.mixed().required(),
    size: Yup.number().moreThan(0).required(),
    weight: Yup.number().moreThan(0).required(),
    age: Yup.number().moreThan(0).required(),
    chakra: Yup.number().moreThan(0).required(),
    power: Yup.number().moreThan(0).required(),
})
export default validationSchema;
