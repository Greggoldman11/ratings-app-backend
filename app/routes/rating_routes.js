// require express so we can make routes
const express = require('express')

// require passport for authentication
const passport = require('passport')

// require the model file
const Rating = require('./../models/rating')

// require the error handler
const {
  requireOwnership,
  handle404,
  BadParamsError,
  BadCredentialsError
}  = require('./../../lib/custom_errors')

// require middleware
const removeBlanks = require('./../../lib/remove_blank_fields')

// require authentication with passort.authenticat(<strategy>, { session: false })
const requireToken = passport.authenticate('bearer', { session: false })

// create a router
const router = express.Router()

// create routes
router.post('/ratings', requireToken, (req, res, next) => {
  // I want to make the owner the current user
  // by setting the owner as the user id
  req.body.rating.owner = req.user.id

  // create a new rating
  Rating.create(req.body.rating)
  // after I create my rating I want to display a 201 created and the body
    .then(rating => {
      res.status(201).json({ rating: rating })
    })
    .catch(next)
})
router.get('/ratings', requireToken, (req, res, next) => {
  // locate all of my ratings
  Rating.find()
    .then(ratings => res.status(200).json({ ratings }))
    .catch(next)
})

router.patch('/ratings:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.rating.owner

  Rating.findById(req.params.id)
    .then(handle404)
    .then(rating => {
      requireOwnership(req, rating)
      return rating.updateOne(req.body.rating)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/ratings:id', requireToken, (req, res, next) => {
  Rating.findById(req.params.id)
    .then(handle404)
    .then(rating => {
      requireOwnership(req, rating)
      return rating.deleteOne(req.body.rating)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
