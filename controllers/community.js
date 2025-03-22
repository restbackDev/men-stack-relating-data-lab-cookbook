const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//GET  /community
router.get('/', async (req,res) => {
  try {
  const allUsers = await User.find({}, 'username')
  res.render('users/index.ejs', {
    users : allUsers
  })
  } catch (error) {
    console.error('Error community index page', error)
    res.redirect('/')
  }
})

//GET /community/:userId 
router.get('/:userId', async (req, res) => {
  try {
      const selectedUser = await User.findById(req.params.userId).select('username pantry')
      res.render('users/show.ejs', { selectedUser })

  } catch (error) {
      console.error('Error finding user pantry:', error)
      res.redirect('/community')
  }
})

module.exports = router;