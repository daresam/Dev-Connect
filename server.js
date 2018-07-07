const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');
const db = require('./config/db');
const items = require('./routes/api/items');

// Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
        .then(() => console.log('Mondb Connected'))
        .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/items', items);

app.listen(port, () => {console.log(`listening on ${port}`)});