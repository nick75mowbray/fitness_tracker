const { db } = require("./workout");
const Workout = require("./workout");

db.Workout = Workout;

module.exports = db;