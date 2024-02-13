const { Activity } = require('../db.js');

const createActivity = async (name, difficulty, duration, season, country) => {
  const newActivity = await Activity.create({name, difficulty, duration, season, country});
  return newActivity;
}

const getAllActivities = async () => {
  const activities = await Activity.findAll();

  return activities;
}

module.exports = { createActivity, getAllActivities }