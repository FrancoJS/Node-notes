const mongoose = require("mongoose");
const { PORTAFOLIO_APP_HOST, PORTAFOLIO_APP_DATABASE } = process.env;
const MONGODB_URL = `mongodb://${PORTAFOLIO_APP_HOST}/${PORTAFOLIO_APP_DATABASE}`;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => err);
