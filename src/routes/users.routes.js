const { Router } = require("express");
const router = Router();

const { renderSigninForm, signIn, renderRegister, register } = require("../controllers/users.controllers");

//Inicio de sesion
router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signIn);

//Registrarse
router.get("/users/register", renderRegister);

router.post("/users/register", register);

module.exports = router;
