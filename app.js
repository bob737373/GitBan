const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.set('view-engine', 'ejs');

// Middlewares
//app.use(auth);
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/index.html')); //__dirname resolves to project folder
});

app.get('/posts', (req, ress) => {
    ress.send('We are on posts');
});

/* !!!!!!!!!!!!!!!!!!!! */
// Connect to DB - Requires .env file in root with database link
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('Connected to DB.'));

// Server listening on port 3000
app.listen(3000);

