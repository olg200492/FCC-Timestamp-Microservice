// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp", function (req, res) {
  const date = new Date();
  return res.json({
      unix: date.getTime(),
      utc:date.toUTCString()
    });
  
});
        

//eg [project url]/api/timestamp/2015-12-25
app.get("/api/timestamp/:date_str", function (req, res) {
  const {date_str} = req.params;
  let date = new Date(date_str);
  
  if(date.toString() === 'Invalid Date'){
     date = new Date(parseInt(date_str));
  }
  if(date.toString() === 'Invalid Date'){
    return res.json({
      error:"Invalid Date"
    });
  }else{
    return res.json({
      unix: date.getTime(),
      utc:date.toUTCString()
    });
  }
  
  
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});