"use strict";

/**
 * GET /
 * Slides page.
 */
exports.getSlides = function(req, res) {
  res.render('slides', {
    title: 'Slides'
  });
};