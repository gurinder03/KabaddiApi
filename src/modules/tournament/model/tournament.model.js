'use strict'
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const tournamentSchema = new mongoose.Schema({
    name: { type: String },
    name_without_space: { type: String, trim: true, lowercase: true },
    federation_logo: { type: String, default: null },
    is_show_federation_logo: { type: Boolean, default: true },
    is_show_score: { type: Boolean, default: true },
    sponser_logo: { type: String, default: null },
    start_date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    end_date: { type: Date },
    slug: { type: String, slug: "name" },
    place: { type: String },
    winning_price: { type: Number },
    runner_up_price: { type: Number },
    sponsors_detail: {},
    referee: [],
    image: { type: String },
    status: { type: String, enum: ["pending", "start", "cancel", "archived"], default: "pending" },
    video: { type: String }
},
    {
        versionKey: false,
    })

module.exports = mongoose.model('tournaments', tournamentSchema, 'tournaments');










