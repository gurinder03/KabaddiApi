'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const commentatorSchema = new mongoose.Schema({
    name: { type: String },
    name_without_space:{type: String,trim: true, lowercase: true},
    slug: { type: String, slug: "name" },
    age:{type: String},
    image:{type: String},
    experience:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('commentators', commentatorSchema, 'commentators');










