const usersCtrl = {};
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

usersCtrl.signIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  const user = await User.findOne({ email });
  if (!user) {
    errors.push({ message: "El usuario ingresado no esta registrado" });
    return res.render("users/signin.hbs", {
      errors,
      email,
    });
  } else {
    const match = await user.matchPassword(password);
    if (!match) {
      errors.push({ message: "El correo o la contraseña son incorrectos" });
      return res.render("users/signin.hbs", {
        errors,
        email,
      });
    }
  }

  req.flash("success_msg", "Inicio de sesion exitoso");

  res.redirect("/");
};

module.exports = usersCtrl;
