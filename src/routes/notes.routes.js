const { Router } = require("express");
const { renderCreateNote, createNote, renderNotes, deleteNote, renderEditNote, updatedNote } = require("../controllers/notes.controllers");

const { isAuthenticated } = require("../helpers/auth");
const router = Router();

//Crear nota
router.get("/notes/create", isAuthenticated, renderCreateNote);
router.post("/notes/create", isAuthenticated, createNote);

//Vista de todas las notas

router.get("/notes/all", isAuthenticated, renderNotes);

//Actualizar nota
router.get("/notes/edit/:id", isAuthenticated, renderEditNote);
router.put("/notes/edit/:id", isAuthenticated, updatedNote);

//Eliminar nota
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
