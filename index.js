require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to the database")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));


app.use(cors());
app.options('*', cors());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Welcome to Api Page')
});
require('./routes')(app);

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Route not found'});
})

const PORT = process.env.APP_PORT || 9900;

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
})


