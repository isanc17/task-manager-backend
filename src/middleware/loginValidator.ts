import { body, ValidationChain, query } from "express-validator";

export const loginValidator: ValidationChain[] = [
  query("usuario")
    .isString()
    .notEmpty()
    .withMessage("El usuario es obligatorio y debe ser una cadena de texto."),
  query("contrasena")
    .isString()
    .notEmpty()
    .withMessage("La contraseña es obligatoria y debe ser una cadena de texto."),
];
