const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override'); //use action="/logout?_method=DELETE" and method="POST" to implement DELETE requests in forms

const initializePassport = require('./src/scripts/passport-config');
initializePassport(passport); //TODO - need to add getUserById function to this call

const app = express();

// Middlewares
app.set('view-engine', 'ejs'); //view engine to use with res.render
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.urlencoded({ extended: false })); //we want to be able to access forms inside of request variables
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //should we resave session variables if nothing has changed
    saveUninitialized: false //do you want to save an empty value in session if there is no value
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/index.html')); //__dirname resolves to project folder
});

app.get('/login', checkNotAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/login.html'));
});

app.get('/auth/github', checkNotAuth, passport.authenticate('github'));

app.get('/auth/github/callback', checkNotAuth, 
    passport.authenticate('github', {failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home
        res.redirect('/');
    }
);

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.get('/profile', checkAuth, (req, res) => {

});

app.get('/myboards', checkAuth, (req, res) => {

});

app.get('/board/', checkAuth, (req, res) => {

});

/* !!!!!!!!!!!!!!!!!!!! */
// Connect to DB - Requires .env file in root with database link
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('Connected to DB.')
);

function checkAuth(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

function checkNotAuth(req, res, next) {
    if(req.isAuthenticated()) {
        res.redirect('/');
    }
    
    next();
};

// Server listening on port 3000
app.listen(3000);

