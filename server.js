const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const randomstring = require('randomstring');
const validateURL = require('url-validate');

const app = express();
app.use(bodyParser.json());

const BASE_URL = "http://localhost:5000/"

// Connection URL
const dbUrl = 'mongodb://admin:password123@ds139934.mlab.com:39934';

// Database Name
const dbName = 'urlshortner';

mongoose.connect(dbUrl + '/' + dbName, { useNewUrlParser: true });
var db = mongoose.connection;
var urlSchema = new mongoose.Schema({
    url: String,
    shortened: String
});
var url = mongoose.model('urls', urlSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database");
    url.find({}, (err, res) => {
        if (err)
            console.log("error occurred!")
        else {
            res.map(obj => {
                app.get("/" + obj.shortened, (req, res) => {
                    res.status(301).redirect(obj.url);
                })
            })
        }
    })
});

app.post('/shorten', (req, response) => {
    console.log("Request /shorten received");
    response.setHeader('Content-Type', 'application/json');
    let data = req.body;
    if (data.url) {
        console.log("URL present in request body");
        if (validateURL(data.url)) {
            console.log("Validated URL");
            url.find({}, (err, res) => {
                console.log("URL find running")
                if (err)
                    response.send(JSON.stringify({ 'status': 0, 'message': err }))
                else {
                    let string, flag = 0;
                    do {
                        console.log("Loop running");
                        flag = 0;
                        string = randomstring.generate(7);
                        res.map(obj => {
                            if (obj.shortened === string)
                                flag = 1;
                        });
                    } while (flag);
                    let document = new url({ url: data.url, shortened: string });
                    document.save((err, res) => {
                        if (err)
                            response.send(JSON.stringify({ 'status': 0, 'message': err }))
                        else {
                            response.send(JSON.stringify({ "status": 1, 'message': BASE_URL + string }))
                            app.get("/" + string, (req, res) => {
                                res.status(301).redirect(data.url);
                            })
                        }
                        mongoose.disconnect();
                    })
                }

            })
        } else {
            response.send(JSON.stringify({
                'status': 0,
                'message': "Invalid URL."
            }))
        }
    } else {
        response.send(JSON.stringify({
            'status': 0,
            'message': "One or more fields missing."
        }))
    }
});

app.listen(process.env.PORT || 8000);