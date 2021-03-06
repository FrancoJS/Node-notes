const notesCtrl = {};
const Note = require("../models/Note");

notesCtrl.renderCreateNote = (req, res) => {
  res.render("notes/create-note.hbs");
};

notesCtrl.createNote = async (req, res) => {
  const errors = [];
  const { title, description } = req.body;

  const note = new Note({
    title,
    description,
  });

  if (title.length > 20) {
    errors.push({ message: "El titulo debe ser menor o igual de 20 caracteres" });
    return res.render("notes/create-note.hbs", { errors, title, description });
  }

  note.user = req.user.id;
  await note.save();

  req.flash("success_msg", "Nota agregada");
  res.redirect("/notes/all");
};

notesCtrl.renderNotes = async (req, res) => {
  if (req.user !== undefined) {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
    res.render("notes/all-notes.hbs", {
      notes,
    });
  }
};

notesCtrl.renderEditNote = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  console.log(note);
  if (note.user !== req.user.id) {
    req.flash("error", "No estas autorizado");
    return res.redirect("/users/signin");
  }
  res.render("notes/edit-note.hbs", note);
};

notesCtrl.updatedNote = async (req, res) => {
  const { title, description } = req.body;

  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Nota actualizada");
  res.redirect("/notes/all");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  req.flash("success_msg", "Nota eliminada");
  res.redirect("/notes/all");
};

module.exports = notesCtrl;
