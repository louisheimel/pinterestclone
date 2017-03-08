'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
    _creator: {type: Schema.ObjectId, ref: 'users', required: true},
    creator_username: String,
    url: {type: String, required: true},
    description: String,
});

module.exports = mongoose.model('Pic', Pic);