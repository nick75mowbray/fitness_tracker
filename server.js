const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

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
  res.send("index.html");
});

app.get("/stats", (req, res) => {
  res.send("stats.html");
});

app.get("/exercise?", (req, res) => {
  res.send("exercise.html");
});

app.get("/exercise", (req, res) => {
  res.send("exercise.html");
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

// add new exercise 
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(
    {body},
    ).then(dbWorkout => {
      console.log("db workout" + dbWorkout);
    })
    .catch(({message}) => {
      console.log(message);
    });
});


// app.post("/submit", ({ body }, res) => {
//   User.create(body)
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
