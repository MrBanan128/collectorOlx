const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title:{ type: String, required: true },
    image:{ type: String, required: true },
    price:{ type: Number, required: true },// price: { type: Number, required: true },
    body: Schema.Types.Mixed,
    description: { type: String, default: '' },
    category: { type: String, required: true }, // Dodaj pole kategorii
    subcategory: { type: String, required: true }, // Dodaj pole podkategorii
    createdAt: { type: Date, default: Date.now },  // Data utworzenia
    views: { type: Number, default: 0 },  // Liczba wyświetleń
    isPromoted: { type: Boolean, default: false },  // Flaga promowania

    expertStatus: { type: Boolean, default: false }, // Czy został oceniony przez eksperta
    expertValue: { type: Number, default: null }, // Proponowana wartość przez eksperta
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Kto ocenił   
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

// Model dla wiadomości
const MessageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // ID nadawcy
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // ID odbiorcy
    title: { type: String, required: true },
    content: { type: String, required: true },  // Treść wiadomości
    timestamp: { type: Date, default: Date.now },  // Data i czas wysłania wiadomości
    status: { type: String, enum: ['unread', 'read'], default: 'unread' }  // Status wiadomości (odczytana/nieodczytana)
});

// Tworzenie modelu wiadomości
const Message = mongoose.model('Message', MessageSchema);

// Eksportuj oba modele
module.exports = { Note, User,  Message };
