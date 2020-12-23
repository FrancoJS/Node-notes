const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const app = express();
require("./config/passport");

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
//Engine para renderizar
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user || null;

  next();
});

//Rutas
app.use(require("./routes/index.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/notes.routes"));

//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
