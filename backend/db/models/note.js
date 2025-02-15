const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    image: String,
    body: Schema.Types.Mixed, // Zmiana typu pola body
});
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
