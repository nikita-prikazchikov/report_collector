var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var TestCase = require('../models/TestCase.js');

router.get('/add', function(req, res) {
    res.render('addtestcase');
});

/* GET /testcases listing. */
router.get('/', function(req, res, next) {
  TestCase.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /testcases */
router.post('/', function(req, res, next) {
  TestCase.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /testcases/id */
router.get('/:id', function(req, res, next) {
  TestCase.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /testcases/:id */
router.put('/:id', function(req, res, next) {
  delete req.body._id;
  TestCase.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /testcases/:id */
router.delete('/:id', function(req, res, next) {
  TestCase.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
