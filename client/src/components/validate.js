const regexUsername =
  /^(?=.{1,35})([a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#%&])(?=.{6,10})/;

export default function validate(inputs) {
  const errors = {};
  if (!inputs.username) {
    errors.username = "El username no debe estar vacío";
  } else if (!regexUsername.test(inputs.username)) {
    errors.username = "El username debe ser un correo electrónico";
  } else if (inputs.username.lenght > 35) {
    errors.username = "El username no debe tener más de 35 caractéres";
  }
  if (!inputs.password) {
    errors.password = "El password no debe estar vacío";
  } else if (!regexPassword.test(inputs.password)) {
    errors.password =
      "El password debe tener una longitud entre 6 y 10 caracteres y al menos 1 carácter especial";
  }
  return errors;
}
