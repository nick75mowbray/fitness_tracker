const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require('path');

const PORT = process.env.PORT || 3002;

const app = express();

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/stats", function(req, res){
  res.sendFile(path.join(__dirname + '/stats.html'));
});

app.get("/exercise?", (req, res) => {
  res.sendFile(path.join(__dirname + '/exercise.html'));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '/exercise.html'));
});

// get last workout
app.get("/api/workouts", (req, res) => {
  db.Workout.findOne(
    {},
    {sort: 'day'},
    function(err, doc){
      res.json(doc);
    })
});

// get workouts in range
app.get("/api/workouts", (req, res) => {
  db.Workout.find(
    {},
    function(err, doc){
      res.json(doc);
    })
});

// add new workout 
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(
    {body},
    ).then(dbWorkout => {
      console.log("db workout" + dbWorkout);
    })
    .catch(({message}) => {
      console.log(message);
    });
    res.end();
});

// // add new exercise 
// app.put("/api/workouts", ({ body }, res) => {
//   db.Workout.create(
//     {body},
//     ).then(dbWorkout => {
//       console.log("db workout" + dbWorkout);
//     })
//     .catch(({message}) => {
//       console.log(message);
//     });
// });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//mongodb+srv://myUser:bVyWdPHRjLUcm97@cluster0.f4l70.mongodb.net/fitness_trackerdb?retryWrites=true&w=majority

