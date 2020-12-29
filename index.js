const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes/routes');
const app = express();

app.use(cors());
app.use('/uploads',express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use(morgan('dev'));


app.listen('3333');
