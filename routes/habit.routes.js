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

router.get('/habitsForUser/:userId', (req, res, next) => {
  const { userId } = req.params;  
  Habit.find()
  .populate('user')
  .then(allTheHabits => {
    const result = allTheHabits.filter(habit => {
       if(habit.user) {
        return habit.user._id == userId;
       }
      }
    );
    res.json(result);
  }) 
  .catch(err => {
    res.json(err)
  });
});

//Create a habbit
router.post('/habits', (req, res, next) => {
    const { title, description, amount, unit, date, user, goodHabit } = req.body;  
    Habit.create({
        title,
        description, 
        amount, 
        unit, 
        date, 
        user,
        goodHabit
    })
    .then(response => {
        console.log("Habit created "+response);
        res.json(response);
    })
    .catch(err => {
        console.log("Error creating habit" + err); 
        res.json(err)
    });
});

//GET route-- to get an specific detail view
router.get('/habits/:habitId', (req, res, next) => {
    const { habitId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Habit.findById(habitId)
      .populate('user')
      .then(habit => res.status(200).json(habit))
      .catch(error => res.json(error));
  });

  //Update habit
  router.put('/habits/:habitId', (req, res, next) => {
    const { habitId } = req.params;
    const {title, description, amount, unit, date, user, goodHabit} = req.body
  
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Habit.findByIdAndUpdate(habitId, {title, description, amount, unit, date, user, goodHabit} )
      .then(() => res.json({ message: `Habit with ${habitId} is updated successfully.` }))
      .catch(error => res.json(error));
  });

  router.delete('/habits/:habitId', (req, res, next) => {
    const { habitId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    //TO DO validation for user deleting project
  
    Habit.findByIdAndRemove(habitId)
      .then(() => res.json({ message: `Habit with ${habitId} is removed successfully.` }))
      .catch(error => res.json(error));
  });


module.exports = router