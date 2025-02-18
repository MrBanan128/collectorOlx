const express = require('express');
const cors = require('cors'); // Dodaj import modułu cors
const {port} = require('./config')
const apiRouter = require('./routes/api');
const passport = require('./passport');
const session = require('express-session');
require('./db/mongoose');//db
require('./passport');
const app = express();
// Dodaj obsługę CORS
app.use(cors());



// app.use('/uploads', express.static('uploads'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  



// Dodaj obsługę parsowania JSON
app.use(express.json());
// import note.js to ensure the note is saved
require('./db/models/note');
// //router
// app.use('/', apiRouter);
app.use('/', apiRouter);
//servera

app.listen(port, function(){
    console.log('serwer słucha... http://localhost:' + port);
});




