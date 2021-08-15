const dotenv = require('dotenv')
dotenv.config();
const fetch = require('node-fetch');
const express = require('express');
var path = require('path');
// Start up an instance of app
const app = express();

//Here we are configuring express instaed of bodyparser  as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname);
const mockAPIResponse = require('./mockAPI.js');


const PORT = 8081;
//get user data
let userUrl = '';
//Meaning Cloud http/api
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
//dotenv api key
const apiKey = process.env.API_KEY;

//get Data from Api



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
   // res.sendFile(path.resolve('src/client/views/index.html'))
})



app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/user', async (req, res) => {
    userUrl = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${userUrl}&lang=en`;
    try {
        const response = await fetch(apiURL)
        const data = await response.json();

        console.log(data, 'postFromServer');
        res.send(data);
    } catch (err) {
        console.log('err: ', err);

    }
});
// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

module.exports = app;
