'use strict'
const mongoose = require('mongoose');
const { Role } = require('../../../contants/contant');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    age: { type: String }, 
    country: { type: String },
    password:{type: String},
    profile_image: { type: String, default: null },
    token: { type: String },
    notification_count: { type: Number, default: 0 },
    is_notification:{type: Boolean, default: true},
    timezone: { type: String, default: null },
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('users', userSchema, 'users');










