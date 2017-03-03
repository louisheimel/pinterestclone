'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
    url: {type: String, required: true},
    description: String,
});

module.exports = mongoose.model('Pic', Pic);