var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var TestCase = require('../models/TestCase.js');

/* GET /testcases listing. */
router.get('/', function (req, res, next) {
    var query = TestCase.find();

    if (req.query.name) {
        query.where("name").equals(req.query.name);
    }
    if (req.query.status) {
        query.where("status").equals(req.query.status);
    }
    if (req.query.tags) {
        var tags = req.query.tags.split(/[, ]/);
        for ( var i = 0; i < tags.length; i++){
            query.where("tags").equals(tags[i]);
        }
    }
    if (req.query.job_name) {
        query.where("job_name").equals(req.query.job_name);
    }
    if (req.query.build_id) {
        query.where("build_id").equals(req.query.build_id);
    }
    else {
        query.limit(100);
    }
    if (req.query.feature) {
        query.where("feature").equals(req.query.feature);
    }
    if (req.query.environment) {
        query.where("environment").equals(req.query.environment);
    }
    if (req.query.project) {
        query.where("project").equals(req.query.project);
    }
    if (req.query.functionality) {
        query.where("functionality").equals(req.query.functionality);
    }
    if (req.query.release) {
        query.where("release").equals(req.query.release);
    }
    if (req.query.limit) {
        query.limit(req.query.limit);
    }
    if (req.query.offset) {
        query.skip(req.query.offset);
    }
    query.exec(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });
});

/* POST /testcases */
router.post('/', function (req, res, next) {
    TestCase.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /testcases/id */
router.get('/:id', function (req, res, next) {
    TestCase.findById(req.params.id, '+steps', function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /testcases/:id */
router.delete('/:id', function (req, res, next) {
    TestCase.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
