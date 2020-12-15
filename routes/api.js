const router = require("express").Router();
const db = require("../models");



  
  // get last workout
  router.get("/api/workouts", async (req, res) => {
    db.Workout.findOne({})
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });});
  
  // get workouts in range
  router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });
  
  // add new workout 
  router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });
  
  // add new exercise 
 router.put("/api/workouts/:workoutid", (req, res) => {
    const body = req.body;
    const workoutId = req.params.workoutid;
    console.log("body", body);
    console.log("id?" + JSON.stringify(req.params) );
    db.Workout.findByIdAndUpdate(
      {_id: workoutId},{$push:{exercises: body}}
      ).then(dbExercise => {
        console.log("db excercise" + dbExercise);
      })
      .catch(({message}) => {
        console.log(message);
      });
      res.end();
  });

module.exports = router;