'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const advertismentSchema = new mongoose.Schema({
     image:{type: String},
     video:{type: String},
     main_post:{type: String},
     other_post:[],
     marquee_logo:{type: String},
     merquee_text:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('advertisments', advertismentSchema, 'advertisments');














