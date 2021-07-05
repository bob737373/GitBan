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


/* !!!!!!!!!!!!!!!!!!!! */
// Connect to DB - Requires .env file in root with database link
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {}
);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));


// Middlewares
app.set('view-engine', 'ejs'); //view engine to use with res.render
app.set('views', path.join(__dirname, '/src/views/pages'));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.json());
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
const homeRouter = require('./src/routes/index');
app.use('/', homeRouter);

const loginRouter = require('./src/routes/login');
app.use('/login', loginRouter);

// app.get('/login', checkNotAuth, (req, res) => {
//     res.sendFile(path.join(__dirname, '/src/html/login.html'));
// });

//app.get('/auth/github', checkNotAuth, passport.authenticate('github'));

// app.get('/auth/github/callback', checkNotAuth, 
//     passport.authenticate('github', {failureRedirect: '/login' }),
//     (req, res) => {
//         // Successful authentication, redirect home
//         res.redirect('/');
//     }
// );

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

const subscribersRouter = require('./src/routes/users');
app.use('/users', subscribersRouter);

app.get('/profile', checkAuth, (req, res) => {

});

app.get('/myboards', checkAuth, (req, res) => {

});

app.get('/board/', checkAuth, (req, res) => {

});




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

// Server listening on port 3000, basically "starts" server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

