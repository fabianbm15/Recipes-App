const regexString = /^[a-zA-Z0-9,. ]+$/;
const regexNumber = /^\d+$/;
const regexURL =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const regexDishTypes = /^[a-zA-Z0-9, ]+$/;

export default function validate(inputs) {
  const errors = {};

  // Validate title
  if (!inputs.title) {
    errors.title = "El title no debe estar vacío";
  } else if (!regexString.test(inputs.title)) {
    errors.title = "El title debe contener solo letras y números";
  }

  // Validate healthScore
  if (!inputs.healthScore) {
    errors.healthScore = "El healthScore no debe estar vacío";
  } else if (!regexNumber.test(inputs.healthScore)) {
    errors.healthScore = "El healthScore debe ser un número";
  }

  // Validate image
  if (!inputs.image) {
    errors.image = "La url de image no debe estar vacía";
  } else if (!regexURL.test(inputs.image)) {
    errors.image = "La url de image debe ser válida";
  }

  // Validate dishTypes
  if (!inputs.dishTypes) {
    errors.dishTypes = "El dishTypes no debe estar vacío";
  } else if (!regexDishTypes.test(inputs.dishTypes)) {
    errors.dishTypes = "El dishTypes debe contener solo letras y números";
  }

  // Validate summary
  if (!inputs.summary) {
    errors.summary = "El summary no debe estar vacío";
  } else if (!regexString.test(inputs.summary)) {
    errors.summary = "El summary debe contener solo letras y números";
  }

  // Validate instructions
  if (!inputs.instructions) {
    errors.instructions = "Las instrucciones no deben estar vacías";
  } else if (!regexString.test(inputs.instructions)) {
    errors.instructions =
      "Las instrucciones deben contener solo letras y números";
  }

  return errors;
}
