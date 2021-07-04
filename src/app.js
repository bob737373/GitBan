const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

// Middlewares
//app.use(auth);

// Routes
app.get('/', (req, ress) => {
    ress.send('We are on home');
});

app.get('/posts', (req, ress) => {
    ress.send('We are on posts');
});

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('Connected to DB.'));

// Server listening on port 3000
app.listen(3000);

