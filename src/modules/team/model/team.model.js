'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const teamSchema = new mongoose.Schema({
    name: { type: String },
    name_without_space:{type: String,trim: true, lowercase: true},
    coach_image:{type: String},
    coach_name:{type: String},
    slug: { type: String, slug: "name" },
    place:{type: String},
    logo:{type: String},
    coach:{},
    players:[],
    video:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('teams', teamSchema, 'teams');










