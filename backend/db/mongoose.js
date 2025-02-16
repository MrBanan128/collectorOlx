const mongoose = require('mongoose');
const { database } = require('../config');

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Zwiększenie czasu timeout dla wyboru serwera
  socketTimeoutMS: 45000 // Zwiększenie czasu timeout dla socketu
})

  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err));

