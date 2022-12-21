
// Require Express to run server and routes
const express = require('express'); 

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=>{console.log(`running on localhost:${port}`)})


// Setup empty JS object to act as endpoint for all routes
let projectData = {};


//POST route adds incoming data to projectData
app.post('/addData', addData);

function addData(req,res){
console.log(
    "addData function "
);
projectData = {}
  dataReq = {
    temp: req.body.temp,
    date: req.body.date,
    feeling: req.body.feeling
  }

  projectData=dataReq;
  console.log(projectData)
  res.send(projectData)
  
}

// GET route  returns the projectData object
app.get('/getData', function (req, res) {
  console.log("all");
  res.send(projectData)
  projectData = {}
})
