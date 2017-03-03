'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
    _creator: {type: Schema.ObjectId, ref: 'users', required: true},
    url: {type: String, required: true},
    description: String,
});

module.exports = mongoose.model('Pic', Pic);