const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Beach = require("../models/beach.model");
const axios = require("axios");
const placesConditions = require("../services/places-conditions.service");
const transporter = require("../configs/nodemailer.config");
const hbs = require("hbs");

const mailer = require('../notifiers/mail.notifier');
//mailer.alert(user, m)


module.exports.checkConditions = (req, res, next) => {
  Promise.all([User.find(), Beach.find()])
    .then(([users, beaches]) => {
      const beachesConditions = [];
      beaches.forEach(beach => {
        beachesConditions.push(placesConditions.check(beach));
      });
      return Promise.all(beachesConditions).then(conditions => {
        users.forEach(user => {
          const places = user.placesMatch(conditions).map(place => place);
          if (places.length > 0) {
            // TODO: send mail to user
            console.log(places[0])
            mailer.alert(user,places);
          } else {
            console.log("Not good bro");
            console.log(places);
          }
        });
      });
    })
    .catch(error => next(error));
};
