const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new PassportLocal(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "El usuario ingresado no esta registrado" });
      } else {
        const match = await user.matchPassword(password);
        if (!match) {
          return done(null, false, { message: "Email o contraseña incorrectos" });
        } else {
          done(null, user, { message: `Bienvenido ${user.name}` });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
