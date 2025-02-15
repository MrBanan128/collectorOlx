const express = require('express');
const cors = require('cors'); // Dodaj import modułu cors
const {port} = require('./config')
const apiRouter = require('./routes/api');
require('./db/mongoose');//db

const app = express();
// Dodaj obsługę CORS
app.use(cors());

// app.use('/uploads', express.static('uploads'));

// Dodaj obsługę parsowania JSON
app.use(express.json());
// import note.js to ensure the note is saved
require('./db/models/note');
// //router
app.use('/', apiRouter);
//server
app.listen(port, function(){
    console.log('serwer słucha... http://localhost:' + port);
});




