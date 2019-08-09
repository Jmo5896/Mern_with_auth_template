const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

const users = require('./routes/api/users');

//set up express as middleware (no need for body-parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//set up db connection
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB succesfully connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//routes
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))