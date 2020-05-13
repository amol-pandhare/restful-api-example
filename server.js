const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL || 'mongodb://localhost/notes';

// mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('Connected to DB...'));

mongoose
     .connect( DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));