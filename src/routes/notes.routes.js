const { Router } = require("express");
const { renderCreateNote, createNote, renderNotes } = require("../controllers/notes.controllers");

const { isAuthenticated } = require("../helpers/auth");
const router = Router();

//Crear nota
router.get("/notes/create", isAuthenticated, renderCreateNote);
router.post("/notes/create", isAuthenticated, createNote);

//Vista de todas las notas

router.get("/notes/all", isAuthenticated, renderNotes);
module.exports = router;
