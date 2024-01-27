'use strict'
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    main_post: { type: String },
    other_post: [{
        position: { type: Number },
        url: { type: String },
        type: { type: String, default: "image" }
    }]
},
    {
        versionKey: false,
        timestamps: true
    }, { createAt: "created_at", updatedAt: "updated_at" })

module.exports = mongoose.model('posts', postSchema, 'posts');














