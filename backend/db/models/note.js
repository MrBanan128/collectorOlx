// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const NoteSchema = new Schema({
//     title: String,
//     image: String,
//     body: Schema.Types.Mixed, // Zmiana typu pola body
// });
// const Note = mongoose.model('Note', NoteSchema);

// module.exports = Note;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model dla notatek
const NoteSchema = new Schema({
    title: String,
    image: String,
    body: Schema.Types.Mixed, 
});
const Note = mongoose.model('Note', NoteSchema);

// Model dla użytkowników
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Eksportuj oba modele
module.exports = { Note, User };
