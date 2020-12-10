const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    required: ["Time is Required", true],
    default: Date.now
  },

  exercises: {
    type: {
      type: String,
      required: ["exercise type is required", true],
      trim: true
    },
    name: {
      type: String,
      required: ["exercise name is required", true],
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      min: 0
    },
    // resistance
    weight: {
      type: Number,
      min: 0
    },
    reps: {
      type: Number,
      min: 0
    },
    sets: {
      type: Number,
      min: 0
    },
    // cardio
    distance: {
      type: Number,
      min: 0
    }
  }
  
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
