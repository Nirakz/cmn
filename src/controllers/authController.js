import {validationResult} from "express-validator/check";

let getLoginRegister = (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postRegister = (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });

    req.flash("errors", errorArr);
    return res.redirect("/login-register");
  }
  // console.log(req.body);
  // save user to mongodb
  // send email
};

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister
};
