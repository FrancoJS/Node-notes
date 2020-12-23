const usersCtrl = {};
const passport = require("passport");
const User = require("../models/User");

//Register
usersCtrl.renderRegister = (req, res) => {
  res.render("users/register.hbs");
};

usersCtrl.register = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
  const regExpEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const regExpName = /[^A-Za-záéíóúÁÉÍÓÚñÑÜü]/gi;

  if (regExpName.test(name)) {
    errors.push({ message: "El nombre no debe tener caracteres especiales o numeros" });
    return res.render("users/register.hbs", {
      errors,
      email,
      password,
      confirm_password,
    });
  }

  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    errors.push({ message: "El correo introducido ya esta en uso" });
    return res.render("users/register.hbs", {
      errors,
      name,
      password,
      confirm_password,
    });
  }

  if (!regExpEmail.test(email)) {
    errors.push({ message: "El correo introducido no es valido" });
    return res.render("users/register.hbs", {
      errors,
      name,
      password,
      confirm_password,
    });
  }

  if (password.length < 8) {
    errors.push({ message: "La contraseña debe tener al menos 8 caracteres" });
    return res.render("users/register.hbs", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  if (password !== confirm_password) {
    errors.push({ message: "Las contraseñas no coinciden" });
    return res.render("users/register.hbs", {
      errors,
      name,
      email,
      password,
    });
  }

  newUser.password = await newUser.encryptPassword(password);

  await newUser.save();

  req.flash("success_msg", "Registro exitoso");
  res.redirect("/users/signin");
};

//Login

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin.hbs");
};

usersCtrl.signIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/signin",
  successFlash: true,
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Has cerrado sesion ");
  res.redirect("/users/signin");
};
module.exports = usersCtrl;
