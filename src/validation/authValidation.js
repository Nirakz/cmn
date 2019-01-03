import {check} from "express-validator/check";
import {validation} from "./../../lang/vi"

let register = [
  check("email", validation.email_incorrect)
    .isEmail()
    .trim(),
  check("gender", validation.gender_incorrect)
    .isIn(["male", "female"]),
  check("password", validation.password_incorrect)
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  check("password_confirmation", validation.password_confirmation_incorrect)
    .custom((value, {req}) => value === req.body.password)
];

module.exports = {
  register: register
};