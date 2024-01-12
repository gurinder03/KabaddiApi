'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const playerSchema = new mongoose.Schema({
    name: { type: String },
    name_without_space:{type: String,trim: true, lowercase: true},
    team:{type: mongoose.Schema.Types.ObjectId, ref:"teams"},
    slug: { type: String, slug: "name" },
    age:{type: String},
    place:{type: String},
    image:{type: String},
    flag:{type: String, default:null},
    status:{type: String,enum:['ban',"notban"],default:"notban"}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('players', playerSchema, 'players');










