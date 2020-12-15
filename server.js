const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness_trackerdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', function() {
  console.log("connected to mongoosedb!");
});

// routes
app.use(require("./routes/api.js"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });
  
  app.get("/stats", function(req, res){
    res.sendFile(path.join(__dirname + '/public/stats.html')); 
  });
  
  app.get("/exercise?", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
  });
  
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//mongodb+srv://myUser:bVyWdPHRjLUcm97@cluster0.f4l70.mongodb.net/fitness_trackerdb?retryWrites=true&w=majority

