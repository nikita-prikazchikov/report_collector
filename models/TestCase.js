var mongoose = require('mongoose');

var TestStepSchema = new mongoose.Schema({
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now },
    name: String,
    status: String,
    description: String,
    screenshot: String,
    error: String
});

var TestCaseSchema = new mongoose.Schema({
    name: String,
    status: String,
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now },
    tags: [String],
    release: String,
    job_name: String,
    build_id: String,
    build_number: Number,
    build_url: String,
    feature: String,
    environment: String,
    project: String,
    functionality: String,
    steps: [TestStepSchema]
});

module.exports = mongoose.model('TestCase', TestCaseSchema);
