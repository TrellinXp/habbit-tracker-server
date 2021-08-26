const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Habit = require('../models/Habit.model'); 

router.get('/habits', (req, res, next) => {
    Habit.find()
    .populate('user')
    .then(allTheHabits => res.json(allTheHabits))
    .catch(err => res.json(err));
});

//Create a habbit
router.post('/habits', (req, res, next) => {
    const { title, description, amount, unit, date, user } = req.body;  
    Habit.create({
        title,
        description, 
        amount, 
        unit, 
        date, 
        user
    })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

module.exports = router