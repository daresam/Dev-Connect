const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');
const db = require('./config/db');
const users = require('./routes/api/users');

// Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {useNewUrlParser: true})
        .then(() => console.log('Mondb Connected'))
        .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

// Body Parser Middleware
app.use(bodyParser.json());


// Routes
app.use('/api/users', users);

app.listen(port, () => {console.log(`listening on ${port}`)});