// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const requestIp = require('request-ip');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus:200}))  // some legacy browsers choke on 204

var ipMiddleware = function(req, res, next){
  const clientIp = requestIp.clientIp(req);
  next();
}

app.use(requestIp.mw());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  const ipAddress = req.clientIp;
  const language = req.acceptsLanguages();
  const software = req.get('User-Agent');

  res.json({
    ipaddress: ipAddress,
    language: language[0],
    software: software
  });
});

// listen for requests :)
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
});
