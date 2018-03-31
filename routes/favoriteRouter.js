var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const authenticate = require('../authenticate');
var Favorite = require('../models/favorite');
var Dish = require('../models/dishes');

const cors = require('./cors');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req,res) => {res.sendStatus = 200;})
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate('user')
      .populate('dishes')
      .then((favorite) => {
        for(i=0; i < req.body.length; i++)
          if(favorite.dishes.indexOf(req.body[i]._id),
            favorite.dishes.push(req.body[i]));
            favorite.save()
            .then((favorite) => {
            console.log('Favorite Created! ');  
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
        })
        .catch((err) => {
          return next(err);
        });
      })
      .catch(err => {
        next(err);
      });
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    var favorite = new Favorites({
      user: req.user._id,
      dishes: req.body
    });
    Favorites.create(favorite)
      .then(
        favorite => {
          console.log("Favorite Created ", favorite);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
      .then(
        response => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

favoriteRouter.route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;})
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((Favorites) => {
      if(!favorites) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({"exists": false, "favorites": favorites})
      }
      else {
        if(favorites.dishes.indexOf(req.params.dishId) <0) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({"exists": false, "favorites": favorites})
        }
        else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({"exists": true, "favorites": favorites})
        }
      }
  },
    (err) => next(err))
    .catch((err) => next(err))
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        favorite => {
          console.log("Favorite Found ", favorite);
          var indexOf = favorite.dishes.indexOf("" + req.params.dishId);
          if (indexOf != -1) {
            err = new Error(
              "Favorite " + req.params.dishId + " already exists!"
            );
            err.status = 404;
            return next(err);
          } else {
            favorite.dishes.push(req.params.dishId);
            favorite
              .save()
              .then(
                favorite => {
                  console.log("Favorite Created ", favorite);
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favorite);
                },
                err => next(err)
              )
              .catch(err => next(err));
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites/dishId");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        favorite => {
          var indexOf = favorite.dishes.indexOf(req.params.dishId);
          if (indexOf == -1) {
            err = new Error(
              "Favorite dish" + req.params.dishId + " not found!"
            );
            err.status = 404;
            return next(err);
          } else {
            favorite.dishes.splice(indexOf, 1);
            favorite.save()
            .then(
              (favorite) => {
                Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((Favorite) => {
                   console.log("Favorite Dish deleted!", favorite);
                   res.statusCode = 200;
                   res.setHeader("Content-Type", "application/json");
                   res.json(favorite);
                })
               
              },
              err => next(err)
            );
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = favoriteRouter;