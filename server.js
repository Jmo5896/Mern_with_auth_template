const express = require('express');
const mongoose = require('mongoose');
const app = express();

//set up express as middleware (no need for body-parser)
app.use(express.urlencoded({  extended:false }));
app.use(express.json());

//set up db connection
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db, { useNewUrlParser:true })
    .then(() => console.log('MongoDB succesfully connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))