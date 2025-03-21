const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


// GET /users:/userid/foods
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      user: req.session.user,
      pantry: currentUser.pantry
    });
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    res.redirect('/');
  }
});

// GET /users/:userId/foods/new
router.get('/new', (req,res) => {
  res.render('foods/new.ejs', {
    user: req.session.user
  });
});

// POST to /users/:userId/foods -create a new pantry item via new.ejs("add item")
router.post("/", async (req,res) => {
  try {
    console.log("adding new pantry item", req.body);
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push( {
      name: req.body.name
    })

    await currentUser.save();
    res.redirect('/')
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    res.redirect('/');
  }
})

// DELETE to /users/:userId/foods/:itemId -deleting a pantry item via index.ejs("del btn")
router.delete('/:itemId', async (req,res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry = currentUser.pantry.filter(item => item._id.toString() !== req.params.itemId);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.error("Error deleting pantry items:", error);
    res.redirect('/');
  }
})

// GET /users/:userId/foods/:itemId/edit -editing the item via index.ejs ("edit btn")
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);

    console.log("Rendering edit page for:", foodItem);
    res.render('foods/edit.ejs', {
      user: req.session.user,
      food: foodItem
      });

  } catch (error) {
    console.log("Error fetching food item:", error);
    res.redirect('/');
      
  }
});

// PUT /users/:userId/foods/:itemId -updating the pantry item via edit.ejs ("edit item btm")
router.put('/:itemId', async (req,res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);
    foodItem.set(req.body);
    
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})






// router logic will go here - will be built later on in the lab
module.exports = router;

