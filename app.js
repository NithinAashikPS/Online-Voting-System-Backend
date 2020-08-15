const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const userRouts = require('./api/routes/user');
const adminRouts = require('./api/routes/admin');
const positionRouts = require('./api/routes/position');
const candidateRouts = require('./api/routes/candidate');
const pollRouts = require('./api/routes/poll');

mongoose.connect('mongodb+srv://NithinAashik:RameshKannan@ovs-pe0xe.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orgin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, x-Requested-with, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRouts);
app.use('/admin', adminRouts);
app.use('/position', positionRouts);
app.use('/candidate', candidateRouts);
app.use('/poll', pollRouts);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            Message: error.message
        }
    });
});

module.exports = app;