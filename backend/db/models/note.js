const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model dla notatek
const NoteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Dodaj powiązanie z użytkownikiem
    title: String,
    image: String,
    phoneNumber: String,
    body: Schema.Types.Mixed, 
});
const Note = mongoose.model('Note', NoteSchema);

// Model dla użytkowników
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['user', 'admin', 'expert'], default: 'user' } // Domyślny status: 'user'
});
const User = mongoose.model('User', UserSchema);

// Eksportuj oba modele
module.exports = { Note, User };
