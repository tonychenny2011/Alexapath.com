'use strict';

var crypto;
var async = require('neo-async');
var passport = require('passport');

var UserRepo = require('../repositories/UserRepository.js');
var emailService = require('../services/emailService.js');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SLIDES */
// handling main slides page that is shown to user after logging in
exports.getSlides = function(req, res) {
  // if user not logged in reroute to index page
  if (!req.user)
    return res.redirect('/');

  res.render('account/slides', {
    title: 'Slides'
  });
};

exports.postSlides = function(req, res, next) {
  res.render('account/slides', {
    title: 'Slides'
  });
};