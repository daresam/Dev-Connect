const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const passport = require('passport');

// Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
                useNewUrlParser: true
        })
        .then(() => console.log('Mondb Connected'))
        .catch(err => console.log(err));


const app = express();
const port = process.env.PORT || 5000;

// Passport Middleware
app.use(passport.initialize());

// Passport Strategy
require('./config/passport')(passport);

// Body Parser Middleware
app.use(bodyParser.urlencoded({
        extended: false
}));
app.use(bodyParser.json());


// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

app.listen(port, () => {
        console.log(`listening on port: ${port}`)
});